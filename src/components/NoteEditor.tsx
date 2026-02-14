"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@/styles/editor.css";

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const btn = (
    label: string,
    action: () => void,
    active: boolean,
  ) => (
    <button
      type="button"
      onClick={action}
      className={`rounded px-2 py-1 text-sm ${
        active
          ? "bg-foreground text-background"
          : "bg-foreground/10 hover:bg-foreground/20"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 border-b border-foreground/10 pb-3">
      {btn("Bold", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
      {btn("Italic", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}

      <span className="mx-1 border-l border-foreground/15" />

      {btn("H1", () => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive("heading", { level: 1 }))}
      {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      {btn("P", () => editor.chain().focus().setParagraph().run(), !editor.isActive("heading"))}

      <span className="mx-1 border-l border-foreground/15" />

      {btn("Bullet List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("Code", () => editor.chain().focus().toggleCode().run(), editor.isActive("code"))}
      {btn("Code Block", () => editor.chain().focus().toggleCodeBlock().run(), editor.isActive("codeBlock"))}
      {btn("HR", () => editor.chain().focus().setHorizontalRule().run(), false)}
    </div>
  );
}

export default function NoteEditor({ mode }: { mode: "create" }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
    ],
    immediatelyRender: false,
  });

  async function handleSubmit() {
    if (!editor) return;
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || undefined,
          contentJson: JSON.stringify(editor.getJSON()),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save note");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-b border-foreground/10 bg-transparent pb-2 text-2xl font-bold outline-none placeholder:text-foreground/30"
      />

      <Toolbar editor={editor} />

      <div className="rounded border border-foreground/10 p-4">
        <EditorContent editor={editor} />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="self-start rounded bg-foreground px-4 py-2 text-background disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save note"}
      </button>
    </div>
  );
}
