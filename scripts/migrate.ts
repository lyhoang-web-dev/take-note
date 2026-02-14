import { getMigrations } from "better-auth/db";
import { auth } from "@/lib/auth";

const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);

if (toBeCreated.length === 0 && toBeAdded.length === 0) {
  console.log("No migrations needed.");
} else {
  if (toBeCreated.length > 0) {
    console.log("Tables to create:", toBeCreated);
  }
  if (toBeAdded.length > 0) {
    console.log("Fields to add:", toBeAdded);
  }
  await runMigrations();
  console.log("Migrations complete.");
}
