#!/usr/bin/env tsx
import { buildSubzoneDraft, getSubzoneSeed, loadSubzoneSeeds, writeDraft } from "../extract/draft-builder.ts";

function parseArgs(argv: string[]): { id?: string; all?: boolean } {
  const idIndex = argv.indexOf("--id");
  const id = idIndex >= 0 ? argv[idIndex + 1] : undefined;
  const all = argv.includes("--all");
  return { id, all };
}

async function scrapeOne(id: string): Promise<void> {
  const seed = await getSubzoneSeed(id);
  if (!seed) {
    throw new Error(`Unknown subzone id: ${id}`);
  }
  console.log(`Scraping ${seed.name} (${seed.id})...`);
  const draft = await buildSubzoneDraft(seed);
  const outputPath = await writeDraft(draft);
  console.log(`Draft written: ${outputPath}`);
  console.log(`  Sources: ${draft.sources.length}`);
  console.log(`  Traditions: ${draft.traditions.length}`);
  console.log(`  Confidence: ${draft.confidence}`);
}

async function main(): Promise<void> {
  const { id, all } = parseArgs(process.argv.slice(2));

  if (all) {
    const seeds = await loadSubzoneSeeds();
    for (const seed of seeds) {
      await scrapeOne(seed.id);
    }
    return;
  }

  if (!id) {
    console.error("Usage: npm run scrape:subzone -- --id <subzone-id>");
    console.error("       npm run scrape:subzone -- --all");
    process.exit(1);
  }

  await scrapeOne(id);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
