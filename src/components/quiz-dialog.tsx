'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check,
  CircleAlert,
  CircleCheck,
  CircleX,
  Copy,
  LoaderCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { QuizQuestion, QuizResult } from '@/types';

interface QuizDialogProps {
  slug: string[];
}

const MAX_RECENT_QUESTIONS = 5;
const MAX_TRACKED_PAGES = 50;
const recentByPage = new Map<string, string[]>();

function getRecentQuestions(pageKey: string): string[] {
  return recentByPage.get(pageKey) ?? [];
}

function rememberQuestion(pageKey: string, question: string) {
  const recent = [...getRecentQuestions(pageKey), question].slice(
    -MAX_RECENT_QUESTIONS
  );
  if (!recentByPage.has(pageKey) && recentByPage.size >= MAX_TRACKED_PAGES) {
    recentByPage.clear();
  }
  recentByPage.set(pageKey, recent);
}

type QuizState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; question: QuizQuestion }
  | { status: 'grading'; question: QuizQuestion }
  | { status: 'result'; question: QuizQuestion; result: QuizResult }
  | { status: 'error'; message: string; question: QuizQuestion | null };

const verdictStyles: Record<
  QuizResult['verdict'],
  { label: string; box: string; iconBox: string; Icon: typeof CircleCheck }
> = {
  correct: {
    label: 'Correct',
    box: 'border-emerald-500/30 bg-emerald-500/5',
    iconBox: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    Icon: CircleCheck,
  },
  partial: {
    label: 'Almost there',
    box: 'border-amber-500/30 bg-amber-500/5',
    iconBox: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    Icon: CircleAlert,
  },
  incorrect: {
    label: 'Not quite',
    box: 'border-destructive/30 bg-destructive/5',
    iconBox: 'bg-destructive/10 text-destructive',
    Icon: CircleX,
  },
};

function getMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong';
}

async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : 'Something went wrong';
    throw new Error(message);
  }
  return data as T;
}

function QuestionText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <p className="text-sm leading-relaxed font-medium text-foreground">
      {parts.map((part, index) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={index}
            className="rounded-md bg-background px-1.5 py-0.5 font-mono text-[0.85em] ring-1 ring-border"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
}

function ResultPanel({ result }: { result: QuizResult }) {
  const [copied, setCopied] = useState(false);
  const style = verdictStyles[result.verdict];

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(result.betterAnswer);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`flex flex-col gap-3 rounded-xl border p-3.5 ${style.box}`}>
      <div className="flex items-center gap-2.5">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${style.iconBox}`}
        >
          <style.Icon aria-hidden="true" className="size-4" />
        </div>
        <span className="text-sm font-semibold">{style.label}</span>
      </div>

      <p className="text-sm leading-relaxed text-foreground">
        {result.feedback}
      </p>

      {result.betterAnswer && (
        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5 dark:bg-black/40">
            <span className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              Model answer
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={copyAnswer}
              aria-label={copied ? 'Copied' : 'Copy model answer'}
              className="text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            >
              {copied ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
            </Button>
          </div>
          <pre className="overflow-x-auto bg-zinc-950 px-3 py-2.5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-100 dark:bg-black/50">
            {result.betterAnswer}
          </pre>
        </div>
      )}
    </div>
  );
}

export function QuizDialog({ slug }: QuizDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<QuizState>({ status: 'idle' });
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pageKey = slug.join('/');

  useEffect(() => {
    if (state.status === 'ready') textareaRef.current?.focus();
  }, [state.status]);

  async function loadQuestion() {
    setState({ status: 'loading' });
    setAnswer('');
    try {
      const question = await postJson<QuizQuestion>('/api/quiz', {
        slug,
        exclude: getRecentQuestions(pageKey),
      });
      rememberQuestion(pageKey, question.question);
      setState({ status: 'ready', question });
    } catch (error) {
      setState({ status: 'error', message: getMessage(error), question: null });
    }
  }

  async function checkAnswer(question: QuizQuestion) {
    setState({ status: 'grading', question });
    try {
      const result = await postJson<QuizResult>('/api/quiz/grade', {
        slug,
        question: question.question,
        answer,
      });
      if (result.correct) setScore((current) => current + 1);
      setState({ status: 'result', question, result });
    } catch (error) {
      setState({ status: 'error', message: getMessage(error), question });
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen && (state.status === 'idle' || state.status === 'error')) {
      void loadQuestion();
    }
  }

  const hasQuestion =
    state.status === 'ready' ||
    state.status === 'grading' ||
    state.status === 'result';

  return (
    <>
      <Button
        size="lg"
        onClick={() => handleOpenChange(true)}
        aria-label="Open practice quiz"
        className="fixed right-5 bottom-5 z-40 animate-in rounded-full pr-4 pl-3.5 shadow-lg shadow-primary/20 ring-1 ring-primary/15 transition-transform fade-in slide-in-from-bottom-2 hover:-translate-y-0.5 max-sm:size-11 max-sm:p-0"
      >
        <Sparkles aria-hidden="true" />
        <span className="max-sm:hidden">Quiz me</span>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-sm:top-auto max-sm:right-0 max-sm:bottom-0 max-sm:left-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-2xl max-sm:pb-[max(1rem,env(safe-area-inset-bottom))] max-sm:slide-in-from-bottom sm:max-w-xl">
          <div className="flex items-start justify-between gap-3 pr-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles aria-hidden="true" className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <DialogTitle>Practice quiz</DialogTitle>
                <DialogDescription>
                  Generated from this page&apos;s content
                </DialogDescription>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
              {score > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <CircleCheck aria-hidden="true" />
                  {score} correct
                </Badge>
              )}
              {hasQuestion && (
                <Badge variant="outline" className="text-xs">
                  {state.question.topic}
                </Badge>
              )}
            </div>
          </div>

          {state.status === 'loading' && (
            <div aria-busy="true" className="flex flex-col gap-3 py-1">
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4">
                <div className="h-4 w-4/5 animate-pulse rounded-md bg-muted-foreground/15" />
                <div className="h-4 w-3/5 animate-pulse rounded-md bg-muted-foreground/15" />
              </div>
              <div className="h-28 w-full animate-pulse rounded-xl bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded-lg bg-muted" />
            </div>
          )}

          {state.status === 'error' && (
            <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3.5">
              <div className="flex items-start gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                  <CircleAlert aria-hidden="true" className="size-4" />
                </div>
                <p className="pt-1 text-sm text-foreground">{state.message}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() =>
                  state.question
                    ? void checkAnswer(state.question)
                    : void loadQuestion()
                }
              >
                {state.question ? 'Try checking again' : 'Try again'}
              </Button>
            </div>
          )}

          {hasQuestion && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <QuestionText text={state.question.question} />
              </div>

              {state.status === 'result' ? (
                <div
                  aria-live="polite"
                  className="flex animate-in flex-col gap-3 fade-in slide-in-from-bottom-1"
                >
                  <ResultPanel result={state.result} />
                  <Button
                    size="sm"
                    className="self-end"
                    onClick={() => void loadQuestion()}
                  >
                    <RotateCcw aria-hidden="true" />
                    Next question
                  </Button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const current = state;
                    if (
                      (current.status === 'ready' ||
                        current.status === 'grading') &&
                      answer.trim()
                    ) {
                      void checkAnswer(current.question);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="quiz-answer"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Your answer
                    </label>
                  </div>
                  <textarea
                    ref={textareaRef}
                    id="quiz-answer"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        (event.metaKey || event.ctrlKey) &&
                        event.key === 'Enter' &&
                        state.status === 'ready' &&
                        answer.trim()
                      ) {
                        event.preventDefault();
                        void checkAnswer(state.question);
                      }
                    }}
                    placeholder="Write your SQL query or answer…"
                    rows={4}
                    maxLength={2000}
                    className="min-h-28 w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 font-mono text-sm leading-relaxed shadow-xs outline-none transition-[box-shadow,border-color] placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {answer.length > 1800 ? `${answer.length}/2000` : ''}
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      aria-busy={state.status === 'grading'}
                      disabled={
                        state.status === 'grading' || answer.trim().length === 0
                      }
                    >
                      {state.status === 'grading' ? (
                        <>
                          <LoaderCircle
                            aria-hidden="true"
                            className="animate-spin"
                          />
                          Checking…
                        </>
                      ) : (
                        'Check answer'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
