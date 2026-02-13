import Link from "next/link";

const dummyNotes = [
  { id: "1", title: "Meeting notes", updatedAt: "2025-01-15", isPublic: false },
  { id: "2", title: "Project ideas", updatedAt: "2025-01-14", isPublic: true },
  { id: "3", title: "Shopping list", updatedAt: "2025-01-13", isPublic: false },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button className="rounded bg-foreground px-4 py-2 text-background">
          Create note
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {dummyNotes.map((note) => (
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
    </div>
  );
}
