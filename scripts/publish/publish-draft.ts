#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { contentDraftSchema, subzoneContentSchema } from "../../src/types/region.ts";
import { paths } from "../lib/paths.ts";

async function main(): Promise<void> {
  const id = process.argv[2];
  if (!id) {
    console.error("Usage: npm run publish:draft -- <subzone-id>");
    process.exit(1);
  }

  const draftPath = path.join(paths.draftsDir, `${id}.json`);
  const raw = await fs.readFile(draftPath, "utf8");
  const draft = contentDraftSchema.parse(JSON.parse(raw));

  if (draft.status !== "approved") {
    console.warn(`Warning: draft status is "${draft.status}", not "approved".`);
    console.warn('Set "status": "approved" in the draft before publishing.');
    process.exit(1);
  }

  const { status: _status, confidence: _confidence, extractedFrom: _extractedFrom, notes: _notes, ...published } =
    draft;
  const validated = subzoneContentSchema.parse(published);

  await fs.mkdir(paths.subzonesDir, { recursive: true });
  const outputPath = path.join(paths.subzonesDir, `${id}.json`);
  await fs.writeFile(outputPath, JSON.stringify(validated, null, 2), "utf8");
  console.log(`Published: ${outputPath}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
