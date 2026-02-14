import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function NoteEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/authenticate");

  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-sm hover:underline">
          &larr; Back to dashboard
        </Link>
        <div className="flex gap-2">
          <button className="rounded border border-foreground/20 px-3 py-1 text-sm hover:bg-foreground/5">
            Share
          </button>
          <button className="rounded border border-red-500/50 px-3 py-1 text-sm text-red-500 hover:bg-red-500/5">
            Delete
          </button>
        </div>
      </div>

      <input
        type="text"
        defaultValue={`Note ${id}`}
        className="border-b border-foreground/10 bg-transparent pb-2 text-2xl font-bold outline-none"
      />

      <div className="min-h-[300px] rounded border border-dashed border-foreground/20 p-4 text-foreground/40">
        TipTap editor placeholder — note {id}
      </div>
    </div>
  );
}
