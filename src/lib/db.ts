import { Database, type SQLQueryBindings } from "bun:sqlite";
import { mkdirSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "app.db");

mkdirSync(join(process.cwd(), "data"), { recursive: true });

const db = new Database(DB_PATH);

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA foreign_keys = ON");

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content_json TEXT NOT NULL,
    is_public INTEGER NOT NULL DEFAULT 0,
    public_slug TEXT UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES user(id)
  )
`);

db.run("CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)");
db.run("CREATE INDEX IF NOT EXISTS idx_notes_public_slug ON notes(public_slug)");
db.run("CREATE INDEX IF NOT EXISTS idx_notes_is_public ON notes(is_public)");

export function queryAll<T>(sql: string, ...params: SQLQueryBindings[]): T[] {
  return db.prepare(sql).all(...params) as T[];
}

export function queryGet<T>(sql: string, ...params: SQLQueryBindings[]): T | undefined {
  return db.prepare(sql).get(...params) as T | undefined;
}

export function execute(sql: string, ...params: SQLQueryBindings[]) {
  return db.prepare(sql).run(...params);
}

export { db };
