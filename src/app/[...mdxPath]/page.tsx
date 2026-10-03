import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { notFound } from 'next/navigation';
import { QuizDialog } from '@/components/quiz-dialog';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

interface GatewayPageProps {
  params: Promise<{ mdxPath: string[] }>;
}

function isStaticAsset(mdxPath: string[]): boolean {
  return (mdxPath.at(-1) ?? '').includes('.');
}

async function loadPage(mdxPath: string[]) {
  if (isStaticAsset(mdxPath)) notFound();

  try {
    return await importPage(mdxPath);
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (
      code === 'MODULE_NOT_FOUND' ||
      (error instanceof Error &&
        error.message.includes('private-next-content-dir'))
    ) {
      notFound();
    }
    throw error;
  }
}

export async function generateMetadata({ params }: GatewayPageProps) {
  const { mdxPath } = await params;
  if (isStaticAsset(mdxPath)) return {};
  try {
    const { metadata } = await importPage(mdxPath);
    return metadata;
  } catch {
    return {};
  }
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page({ params }: GatewayPageProps) {
  const { mdxPath } = await params;
  const { default: MDXContent, toc, metadata } = await loadPage(mdxPath);
  return (
    <>
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent />
      </Wrapper>
      <QuizDialog slug={mdxPath} />
    </>
  );
}
