import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getNotesByUser } from "@/lib/notes";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/authenticate");

  const notes = getNotesByUser(session.user.id);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Link
          href="/notes/new"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          New Note
        </Link>
      </div>
      {notes.length === 0 ? (
        <p className="text-foreground/50">
          No notes yet. Create your first note!
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {notes.map((note) => (
            <li key={note.id}>
              <Link
                href={`/notes/${note.id}`}
                className="flex items-center justify-between rounded border border-foreground/10 px-4 py-3 hover:bg-foreground/5"
              >
                <span className="font-medium">{note.title}</span>
                <span className="flex gap-3 text-sm text-foreground/50">
                  {note.isPublic && <span>Public</span>}
                  <span>{note.updatedAt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
