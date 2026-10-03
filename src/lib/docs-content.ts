import fs from 'node:fs/promises';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const MAX_CHARS = 12_000;
const SEGMENT_RE = /^[a-z0-9-]+$/;

export class DocNotFoundError extends Error {
  constructor() {
    super('Docs page not found');
    this.name = 'DocNotFoundError';
  }
}

export interface Lesson {
  title: string;
  description: string;
  text: string;
  headings: string[];
}

function readFrontmatter(raw: string): {
  title: string;
  description: string;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { title: '', description: '', body: raw };

  const read = (key: string) =>
    match[1]
      .split(/\r?\n/)
      .find((line) => line.startsWith(`${key}:`))
      ?.slice(key.length + 1)
      .trim()
      .replace(/^["']|["']$/g, '') ?? '';

  return {
    title: read('title'),
    description: read('description'),
    body: raw.slice(match[0].length),
  };
}

function extractHeadings(text: string): string[] {
  return [...text.matchAll(/^#{2,3}\s+(.+)$/gm)]
    .map((match) => match[1].trim())
    .filter((heading) => heading.length > 0);
}

function toPlainText(mdx: string): string {
  return mdx
    .replace(/^import\s.*$/gm, '')
    .replace(/^export\s.*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function getLesson(slug: string[]): Promise<Lesson> {
  if (
    slug.length === 0 ||
    slug.length > 8 ||
    !slug.every((segment) => SEGMENT_RE.test(segment))
  ) {
    throw new DocNotFoundError();
  }

  const filePath = path.resolve(CONTENT_DIR, ...slug) + '.mdx';
  if (!filePath.startsWith(CONTENT_DIR + path.sep)) {
    throw new DocNotFoundError();
  }

  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    throw new DocNotFoundError();
  }

  const { title, description, body } = readFrontmatter(raw);
  const header = [
    title && `Page: ${title}`,
    description && `Summary: ${description}`,
  ]
    .filter(Boolean)
    .join('\n');
  const text = [header, toPlainText(body)].filter(Boolean).join('\n\n');
  if (text.length === 0) {
    throw new DocNotFoundError();
  }

  const finalText =
    text.length > MAX_CHARS
      ? `${text.slice(0, MAX_CHARS)}\n\n[lesson truncated]`
      : text;

  return {
    title,
    description,
    text: finalText,
    headings: extractHeadings(finalText),
  };
}
