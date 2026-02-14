import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NoteEditor from "@/components/NoteEditor";

export default async function NewNotePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/authenticate");

  return (
    <div className="flex flex-col gap-6">
      <Link href="/dashboard" className="text-sm hover:underline">
        &larr; Back to dashboard
      </Link>
      <NoteEditor mode="create" />
    </div>
  );
}
