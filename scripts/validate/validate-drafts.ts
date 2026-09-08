#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { contentDraftSchema } from "../../src/types/region.ts";
import { paths } from "../lib/paths.ts";

async function main(): Promise<void> {
  let files: string[];
  try {
    files = await fs.readdir(paths.draftsDir);
  } catch {
    console.log("No drafts directory found.");
    process.exit(0);
  }

  const jsonFiles = files.filter((file) => file.endsWith(".json"));
  if (jsonFiles.length === 0) {
    console.log("No draft files found.");
    process.exit(0);
  }

  let valid = 0;
  let invalid = 0;

  for (const file of jsonFiles) {
    const filePath = path.join(paths.draftsDir, file);
    const raw = await fs.readFile(filePath, "utf8");
    try {
      contentDraftSchema.parse(JSON.parse(raw));
      console.log(`✓ ${file}`);
      valid += 1;
    } catch (error) {
      console.error(`✗ ${file}`);
      console.error(error);
      invalid += 1;
    }
  }

  console.log(`\n${valid} valid, ${invalid} invalid`);
  if (invalid > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
