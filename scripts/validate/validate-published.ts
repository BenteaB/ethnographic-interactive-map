#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import {
  regionContentSchema,
  regionIds,
  subzoneContentSchema
} from "../../src/types/region.ts";
import { paths } from "../lib/paths.ts";
import { findLocalSourceUrls } from "./source-urls.ts";

type ValidationTarget = {
  label: string;
  filePath: string;
  parse: (raw: unknown) => unknown;
};

async function listJsonFiles(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir);
    return files.filter((file) => file.endsWith(".json")).map((file) => path.join(dir, file));
  } catch {
    return [];
  }
}

async function main(): Promise<void> {
  const subzoneFiles = await listJsonFiles(paths.subzonesDir);
  const regionFiles = regionIds.map((id) => path.join(paths.regionsDir, `${id}.json`));

  const targets: ValidationTarget[] = [
    ...subzoneFiles.map((filePath) => ({
      label: `subzone:${path.basename(filePath)}`,
      filePath,
      parse: (raw: unknown) => subzoneContentSchema.parse(raw)
    })),
    ...regionFiles.map((filePath) => ({
      label: `region:${path.basename(filePath)}`,
      filePath,
      parse: (raw: unknown) => regionContentSchema.parse(raw)
    }))
  ];

  if (targets.length === 0) {
    console.log("No published content files found.");
    process.exit(1);
  }

  let valid = 0;
  let invalid = 0;

  for (const target of targets) {
    const raw = await fs.readFile(target.filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;

    try {
      const validated = target.parse(parsed);
      const localUrls = findLocalSourceUrls(validated);
      if (localUrls.length > 0) {
        throw new Error(`local source URLs are not allowed: ${localUrls.join(", ")}`);
      }

      console.log(`✓ ${target.label}`);
      valid += 1;
    } catch (error) {
      console.error(`✗ ${target.label}`);
      console.error(error);
      invalid += 1;
    }
  }

  const expectedSubzones = 22;
  if (subzoneFiles.length !== expectedSubzones) {
    console.warn(
      `\nWarning: expected ${expectedSubzones} subzone files, found ${subzoneFiles.length}.`
    );
  }

  console.log(`\n${valid} valid, ${invalid} invalid`);
  if (invalid > 0) process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
