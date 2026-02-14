"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { signIn, signUp } from "@/lib/auth-client";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const isLogin = mode === "login";

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"email" | "password", string>>
  >({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const errors: Partial<Record<"email" | "password", string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as "email" | "password";
        if (!errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = isLogin
        ? await signIn.email({ email, password })
        : await signUp.email({ name: email, email, password });

      if (authError) {
        setError(authError.message ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col py-12">
      <h1 className="mb-2 text-2xl font-bold">
        {isLogin ? "Welcome back" : "Create an account"}
      </h1>
      <p className="mb-8 text-sm text-foreground/60">
        {isLogin
          ? "Enter your credentials to access your notes."
          : "Sign up to start creating and sharing notes."}
      </p>

      {error && (
        <output
          role="alert"
          className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </output>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <fieldset disabled={loading} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-invalid={!!fieldErrors.email}
              className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10"
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-red-600 dark:text-red-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="••••••••"
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
              aria-invalid={!!fieldErrors.password}
              className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10"
            />
            {fieldErrors.password && (
              <p
                id="password-error"
                className="text-xs text-red-600 dark:text-red-400"
              >
                {fieldErrors.password}
              </p>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Please wait\u2026"
            : isLogin
              ? "Log in"
              : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        {isLogin ? "Don\u2019t have an account?" : "Already have an account?"}{" "}
        <Link
          href={`/authenticate?mode=${isLogin ? "signup" : "login"}`}
          className="font-medium text-foreground underline underline-offset-2"
        >
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </p>
    </div>
  );
}

export default function AuthenticatePage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}
