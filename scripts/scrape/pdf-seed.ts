import fs from "node:fs/promises";
import { paths } from "../lib/paths.ts";

type PdfZone = {
  section: number;
  name: string;
  text: string;
  villages: string[];
};

type PdfZonesFile = {
  source: string;
  zones: PdfZone[];
};

export type PdfSeedResult = {
  summary: string | null;
  geography: string | null;
  villages: string[];
  sourcePath: string;
};

export async function loadPdfSeed(section: number): Promise<PdfSeedResult | null> {
  const raw = await fs.readFile(paths.pdfZones, "utf8");
  const data = JSON.parse(raw) as PdfZonesFile;
  const zone = data.zones.find((entry) => entry.section === section);
  if (!zone) return null;

  return {
    summary: zone.text,
    geography: zone.text,
    villages: zone.villages,
    sourcePath: data.source
  };
}
