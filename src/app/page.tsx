import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-20 text-center">
      <h1 className="text-4xl font-bold">Take Note</h1>
      <p className="max-w-md text-lg text-foreground/60">
        Create, edit, and share rich-text notes with a simple, minimal editor.
      </p>
      <Link
        href="/authenticate"
        className="rounded-md bg-foreground px-6 py-2 text-background"
      >
        Get started
      </Link>
    </div>
  );
}
