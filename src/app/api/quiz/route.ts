import { NextResponse } from 'next/server';
import { DocNotFoundError, getLesson } from '@/lib/docs-content';
import { AiError } from '@/lib/groq';
import {
  generateQuestion,
  MAX_EXCLUDED_LENGTH,
  MAX_EXCLUDED_QUESTIONS,
} from '@/lib/quiz';
import { getClientId, isRateLimited } from '@/lib/rate-limit';

function parseExclude(value: unknown): string[] | null {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return null;

  const cleaned = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && item.length <= MAX_EXCLUDED_LENGTH)
    .slice(0, MAX_EXCLUDED_QUESTIONS);

  return [...new Set(cleaned)];
}

export async function POST(request: Request) {
  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: 'Too many quizzes, slow down a little' },
      { status: 429 }
    );
  }

  let body: { slug?: unknown; exclude?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const slug = body.slug;
  if (
    !Array.isArray(slug) ||
    !slug.every((segment): segment is string => typeof segment === 'string')
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const exclude = parseExclude(body.exclude);
  if (exclude === null) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const lesson = await getLesson(slug);
    const question = await generateQuestion(lesson, exclude);
    return NextResponse.json(question);
  } catch (error) {
    if (error instanceof DocNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof AiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    console.error('Quiz generation failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
