#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { regionContentSchema, regionIds, type RegionContent, type RegionId } from "../../src/types/region.ts";
import { paths } from "../lib/paths.ts";
import { loadSubzoneSeeds } from "../extract/draft-builder.ts";

function parseArgs(argv: string[]): { id?: RegionId; force: boolean } {
  const idIndex = argv.indexOf("--id");
  const id = idIndex >= 0 ? (argv[idIndex + 1] as RegionId) : undefined;
  const force = argv.includes("--force");
  return { id, force };
}

async function loadPublishedSubzonesForMacro(macroId: RegionId) {
  const seeds = await loadSubzoneSeeds();
  const macroSeeds = seeds.filter((seed) => seed.macroRegionId === macroId);
  const subzones = [];

  for (const seed of macroSeeds) {
    const filePath = path.join(paths.subzonesDir, `${seed.id}.json`);
    try {
      const raw = await fs.readFile(filePath, "utf8");
      subzones.push(JSON.parse(raw));
    } catch {
      // skip unpublished
    }
  }
  return subzones;
}

async function aggregateMacro(macroId: RegionId, force: boolean): Promise<void> {
  const regionPath = path.join(paths.regionsDir, `${macroId}.json`);
  const existingRaw = await fs.readFile(regionPath, "utf8");
  const existing = regionContentSchema.parse(JSON.parse(existingRaw));

  if (!force && existing.games.length > 1) {
    console.log(`Skipping ${macroId}: macro content already has multiple items. Use --force to overwrite.`);
    return;
  }

  const subzones = await loadPublishedSubzonesForMacro(macroId);
  if (subzones.length === 0) {
    console.log(`No published subzones for ${macroId}.`);
    return;
  }

  const aggregated: RegionContent = {
    ...existing,
    summary: subzones
      .map((subzone) => subzone.summary)
      .slice(0, 3)
      .join(" "),
    games: subzones.flatMap((subzone) => subzone.games).slice(0, 8),
    costumes: subzones.flatMap((subzone) => subzone.costumes).slice(0, 8),
    traditions: subzones.flatMap((subzone) => subzone.traditions).slice(0, 12),
    images: subzones.flatMap((subzone) => subzone.images).slice(0, 6),
    sources: subzones.flatMap((subzone) => subzone.sources).slice(0, 10)
  };

  const validated = regionContentSchema.parse(aggregated);
  await fs.writeFile(regionPath, JSON.stringify(validated, null, 2), "utf8");
  console.log(`Updated macro region: ${regionPath} (${subzones.length} subzones aggregated)`);
}

async function main(): Promise<void> {
  const { id, force } = parseArgs(process.argv.slice(2));

  if (id) {
    if (!regionIds.includes(id)) {
      throw new Error(`Unknown macro region id: ${id}`);
    }
    await aggregateMacro(id, force);
    return;
  }

  for (const macroId of regionIds) {
    await aggregateMacro(macroId, force);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
