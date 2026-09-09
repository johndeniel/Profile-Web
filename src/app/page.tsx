export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="font-heading text-5xl font-bold">
        Heading Font (Lora Serif)
      </h1>

      <p className="font-sans max-w-2xl text-center text-xl">
        Body text using Geist Sans. The quick brown fox jumps over the lazy dog.
        This combination pairs a serif heading with a clean sans-serif body for
        better contrast.
      </p>

      <code className="font-mono rounded-lg bg-neutral-100 px-4 py-2 text-sm dark:bg-neutral-800">
        const code = &quot;Monospace using Geist Mono&quot;;
      </code>
    </div>
  );
}
