import { NextResponse } from 'next/server';
import { DocNotFoundError, getLesson } from '@/lib/docs-content';
import { AiError } from '@/lib/groq';
import { gradeAnswer } from '@/lib/quiz';
import { getClientId, isRateLimited } from '@/lib/rate-limit';

const MAX_QUESTION_LENGTH = 500;
const MAX_ANSWER_LENGTH = 2_000;

export async function POST(request: Request) {
  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: 'Too many quizzes, slow down a little' },
      { status: 429 }
    );
  }

  let body: { slug?: unknown; question?: unknown; answer?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { slug, question, answer } = body;
  if (
    !Array.isArray(slug) ||
    !slug.every((segment): segment is string => typeof segment === 'string') ||
    typeof question !== 'string' ||
    question.length === 0 ||
    question.length > MAX_QUESTION_LENGTH ||
    typeof answer !== 'string' ||
    answer.trim().length === 0 ||
    answer.length > MAX_ANSWER_LENGTH
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const lesson = await getLesson(slug);
    const result = await gradeAnswer(lesson.text, question, answer);
    return NextResponse.json(result);
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
    console.error('Answer grading failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
