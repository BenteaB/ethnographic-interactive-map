import transilvaniaRaw from "../../data/regions/transilvania.json";
import banatRaw from "../../data/regions/banat.json";
import olteniaRaw from "../../data/regions/oltenia.json";
import munteniaRaw from "../../data/regions/muntenia.json";
import moldovaRaw from "../../data/regions/moldova.json";
import dobrogeaRaw from "../../data/regions/dobrogea.json";
import bucovinaRaw from "../../data/regions/bucovina.json";
import maramuresRaw from "../../data/regions/maramures.json";
import marginimeaRaw from "../../data/drafts/marginimea-sibiului.json";

import transilvaniaEn from "../../data/regions/en/transilvania.json";
import banatEn from "../../data/regions/en/banat.json";
import olteniaEn from "../../data/regions/en/oltenia.json";
import munteniaEn from "../../data/regions/en/muntenia.json";
import moldovaEn from "../../data/regions/en/moldova.json";
import dobrogeaEn from "../../data/regions/en/dobrogea.json";
import bucovinaEn from "../../data/regions/en/bucovina.json";
import maramuresEn from "../../data/regions/en/maramures.json";
import marginimeaEn from "../../data/drafts/marginimea-sibiului.json"; // Need to translate marginimea too eventually

import { regionContentSchema, type RegionContent, type RegionId } from "@/types/region";
import { Language } from "@/lib/i18n";

const rawDataRo: Record<RegionId, unknown> = {
  transilvania: transilvaniaRaw,
  banat: banatRaw,
  oltenia: olteniaRaw,
  muntenia: munteniaRaw,
  moldova: moldovaRaw,
  dobrogea: dobrogeaRaw,
  bucovina: bucovinaRaw,
  maramures: maramuresRaw,
  "marginimea-sibiului": marginimeaRaw
};

const rawDataEn: Record<RegionId, unknown> = {
  transilvania: transilvaniaEn,
  banat: banatEn,
  oltenia: olteniaEn,
  muntenia: munteniaEn,
  moldova: moldovaEn,
  dobrogea: dobrogeaEn,
  bucovina: bucovinaEn,
  maramures: maramuresEn,
  "marginimea-sibiului": marginimeaEn
};

const regionsByIdRo = Object.fromEntries(
  Object.entries(rawDataRo).map(([id, data]) => [id, regionContentSchema.parse(data)])
) as Record<RegionId, RegionContent>;

const regionsByIdEn = Object.fromEntries(
  Object.entries(rawDataEn).map(([id, data]) => [id, regionContentSchema.parse(data)])
) as Record<RegionId, RegionContent>;

export function getRegionContent(regionId: RegionId, lang: Language = "ro"): RegionContent {
  return lang === "en" ? regionsByIdEn[regionId] : regionsByIdRo[regionId];
}

export function getAllRegions(lang: Language = "ro"): RegionContent[] {
  return Object.values(lang === "en" ? regionsByIdEn : regionsByIdRo);
}
