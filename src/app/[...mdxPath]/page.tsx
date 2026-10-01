import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

interface GatewayPageProps {
  params: Promise<{ mdxPath: string[] }>;
}

export async function generateMetadata({ params }: GatewayPageProps) {
  const { mdxPath } = await params;
  const { metadata } = await importPage(mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page({ params }: GatewayPageProps) {
  const { mdxPath } = await params;
  const { default: MDXContent, toc, metadata } = await importPage(mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent />
    </Wrapper>
  );
}
