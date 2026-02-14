"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  return (
    <header className="border-b border-foreground/10 px-6 py-4">
      <nav className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/dashboard" className="text-lg font-semibold">
          NextNotes
        </Link>
        {isPending ? (
          <span className="text-sm text-foreground/40">...</span>
        ) : session ? (
          <button
            onClick={async () => {
              await signOut();
              router.push("/authenticate");
            }}
            className="hover:underline"
          >
            Log out
          </button>
        ) : (
          <Link href="/authenticate" className="hover:underline">
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
