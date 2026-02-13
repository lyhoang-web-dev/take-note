"use client";

import { useState } from "react";

export default function AuthenticatePage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mx-auto max-w-sm py-12">
      <h1 className="mb-6 text-2xl font-bold">
        {isLogin ? "Log in" : "Sign up"}
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: wire up auth
        }}
      >
        {!isLogin && (
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Name</span>
            <input
              type="text"
              placeholder="Your name"
              className="rounded border border-foreground/20 bg-transparent px-3 py-2"
            />
          </label>
        )}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded border border-foreground/20 bg-transparent px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="rounded border border-foreground/20 bg-transparent px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          {isLogin ? "Log in" : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-sm text-foreground/60">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="underline"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}
