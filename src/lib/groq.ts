const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const REQUEST_TIMEOUT_MS = 30_000;

export class AiError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = 'AiError';
    this.status = status;
  }
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatOptions {
  temperature?: number;
  maxCompletionTokens?: number;
}

function extractJson(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        // fall through to the error below
      }
    }
    throw new AiError('AI returned an invalid response');
  }
}

export async function chatJson<T>(
  messages: ChatMessage[],
  options: ChatOptions = {}
): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new AiError('AI quiz is not configured', 503);
  }

  const model = process.env.GROQ_MODEL ?? DEFAULT_MODEL;

  let response: Response;
  try {
    response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.2,
        max_completion_tokens: options.maxCompletionTokens ?? 2_048,
        ...(model.startsWith('openai/gpt-oss')
          ? { reasoning_effort: 'low' }
          : {}),
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new AiError('The AI service did not respond in time', 504);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new AiError('AI quiz could not authenticate', 503);
    }
    if (response.status === 429) {
      throw new AiError('AI quiz is busy, try again in a minute', 429);
    }
    throw new AiError('The AI service is unavailable', 502);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || content.length === 0) {
    throw new AiError('AI returned an empty response');
  }

  return extractJson(content) as T;
}
