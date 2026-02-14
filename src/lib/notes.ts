import { queryAll, queryGet, execute } from "@/lib/db";

export interface NoteRow {
  id: string;
  user_id: string;
  title: string;
  content_json: string;
  is_public: number;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  contentJson: string;
  isPublic: boolean;
  publicSlug: string | null;
  createdAt: string;
  updatedAt: string;
}

function toNote(row: NoteRow): Note {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    contentJson: row.content_json,
    isPublic: row.is_public === 1,
    publicSlug: row.public_slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createNote(
  userId: string,
  { title, contentJson }: { title?: string; contentJson?: string },
): Note {
  const id = crypto.randomUUID();
  const noteTitle = title?.trim() || "Untitled note";
  const noteContent = contentJson ?? '{"type":"doc","content":[{"type":"paragraph"}]}';

  execute(
    `INSERT INTO notes (id, user_id, title, content_json) VALUES (?, ?, ?, ?)`,
    id,
    userId,
    noteTitle,
    noteContent,
  );

  return toNote(
    queryGet<NoteRow>(`SELECT * FROM notes WHERE id = ?`, id)!,
  );
}

export function getNotesByUser(userId: string): Note[] {
  const rows = queryAll<NoteRow>(
    `SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC`,
    userId,
  );
  return rows.map(toNote);
}

export function getNoteById(userId: string, noteId: string): Note | undefined {
  const row = queryGet<NoteRow>(
    `SELECT * FROM notes WHERE id = ? AND user_id = ?`,
    noteId,
    userId,
  );
  return row ? toNote(row) : undefined;
}
