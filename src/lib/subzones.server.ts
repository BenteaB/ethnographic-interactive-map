import fs from "node:fs";
import path from "node:path";
import {
  subzoneContentSchema,
  subzoneSeedsFileSchema,
  type SubzoneContent
} from "@/types/region";
import { buildSubzoneLookup, getSubzoneFromLookup } from "./subzones";

export { buildSubzoneLookup, getSubzoneFromLookup };

export function loadPublishedSubzones(lang: "ro" | "en" = "ro"): SubzoneContent[] {
  const subzonesDir = path.join(process.cwd(), "data/subzones", lang === "en" ? "en" : "");
  if (!fs.existsSync(subzonesDir)) {
    return [];
  }

  return fs
    .readdirSync(subzonesDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(subzonesDir, file), "utf8");
      return subzoneContentSchema.parse(JSON.parse(raw));
    });
}

export function loadSubzoneSeeds() {
  const raw = fs.readFileSync(path.join(process.cwd(), "data/seeds/subzones.json"), "utf8");
  return subzoneSeedsFileSchema.parse(JSON.parse(raw)).subzones;
}
