import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(scriptsDir, "../..");

/** Public citation for the official PDF baseline (tracked in-repo). */
export const pdfSourceCitation = {
  url: "https://github.com/BenteaB/ethnographic-interactive-map/blob/main/artifacts/Zone_etnografice.pdf",
  title: "Zone etnografice – Muzeul Țăranului Român",
  relativePath: "artifacts/Zone_etnografice.pdf"
} as const;

export const paths = {
  allowlist: path.join(projectRoot, "scripts/sources/allowlist.json"),
  subzoneSeeds: path.join(projectRoot, "data/seeds/subzones.json"),
  pdfZones: path.join(projectRoot, "data/seeds/pdf-zones.json"),
  draftsDir: path.join(projectRoot, "data/drafts"),
  rawDir: path.join(projectRoot, "data/raw"),
  subzonesDir: path.join(projectRoot, "data/subzones"),
  regionsDir: path.join(projectRoot, "data/regions")
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeRegionName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
