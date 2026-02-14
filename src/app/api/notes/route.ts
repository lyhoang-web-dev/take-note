import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createNote } from "@/lib/notes";

const createNoteSchema = z.object({
  title: z.string().optional(),
  contentJson: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = createNoteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid body", details: result.error.issues }, { status: 400 });
  }

  const note = createNote(session.user.id, result.data);
  return NextResponse.json(note, { status: 201 });
}
