import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Take Note",
  description: "Create, edit, and share rich-text notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <header className="border-b border-foreground/10 px-6 py-4">
          <nav className="mx-auto flex max-w-4xl items-center justify-between">
            <Link href="/" className="text-lg font-semibold">
              Take Note
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/authenticate" className="hover:underline">
                Log in
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
