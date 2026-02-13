# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A note-taking web app where authenticated users create, edit, delete, and publicly share rich-text notes. Notes use TipTap (JSON-based rich text) stored in SQLite. See `SPEC.MD` for the full technical specification.

## Commands

- **Dev server:** `bun dev`
- **Build:** `bun run build`
- **Production server:** `bun start`
- **Lint:** `bun run lint` (ESLint with Next.js + TypeScript rules)

No test framework is configured yet.

## Tech Stack

- **Framework:** Next.js 16 with Pages Router (currently scaffolded; spec targets App Router migration)
- **Runtime/Package manager:** Bun
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Rich text editor:** TipTap v3 (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`)
- **Auth:** better-auth
- **Validation:** Zod v4
- **Database:** SQLite via Bun's built-in SQLite client (raw SQL, no ORM)

## Architecture

### Current State

The project is freshly scaffolded from `create-next-app` with dependencies installed. The actual application features are not yet implemented.

### Target Architecture (per SPEC.MD)

**Three layers:**
1. **Presentation** — Next.js pages/components + TipTap editor + Tailwind
2. **API** — REST-like JSON endpoints under `/api/notes` (route handlers)
3. **Data access** — Raw SQL via Bun SQLite client, repository pattern in `lib/notes.ts`, DB helper in `lib/db.ts`

**Routes:**
- `/` — Landing page
- `/dashboard` — Authenticated notes list
- `/notes/[id]` — Note editor (TipTap)
- `/p/[slug]` — Public read-only note viewer

**Database:** Single SQLite file (`data/app.db`). Tables: `user`, `session`, `account`, `verification` (managed by better-auth) + `notes` (custom). Notes content stored as stringified TipTap JSON in `content_json` column.

**Auth flow:** better-auth handles registration/login/sessions. All `/api/notes` endpoints verify auth and scope queries to the authenticated user's `user_id`. Public note access (`/p/[slug]`) is unauthenticated read-only.

## Key Conventions

- Path alias: `@/*` maps to `./src/*`
- TipTap content is always stored as `JSON.stringify(editor.getJSON())` and parsed back when loading
- Note sharing uses random slugs (16+ chars) for public URLs
- Every note DB query in authenticated context must filter by `user_id` to prevent cross-user access
