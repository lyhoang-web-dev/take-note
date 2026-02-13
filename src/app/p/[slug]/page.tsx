export default async function PublicNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex flex-col gap-6 py-8">
      <h1 className="text-2xl font-bold">Public Note</h1>
      <p className="text-sm text-foreground/50">Shared via: /p/{slug}</p>
      <div className="min-h-[200px] rounded border border-foreground/10 p-6 text-foreground/40">
        Read-only content placeholder — slug {slug}
      </div>
    </div>
  );
}
