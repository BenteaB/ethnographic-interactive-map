import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { RegionId as EthnographicRegionId } from "@/types/region"; // Alias to avoid conflict

export type RegionId = EthnographicRegionId | "unmapped"; // Union type including "unmapped"

export type RegionFeatureProperties = {
  regionId: RegionId; // Use the union type
  name: string;
  county: string;
  subzone: string;
};

type CountyFeatureProperties = {
  shapeName: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
};

export type CountyFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  CountyFeatureProperties
>;

type RegionMeta = {
  regionId: EthnographicRegionId; // Keep original type here
  name: string;
  subzone: string;
};

export type RegionFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  RegionFeatureProperties
>;

// Mapping of normalized county names to ethnographic regions.
export const countyToRegion: Record<string, RegionMeta> = {
  ALBA: { regionId: "transilvania", name: "Transilvania", subzone: "Podisul Tarnavelor" },
  ARAD: { regionId: "transilvania", name: "Transilvania", subzone: "Crisana (Campia Aradului)" },
  ARGES: { regionId: "muntenia", name: "Muntenia", subzone: "Arges si Muscel" },
  BACAU: { regionId: "moldova", name: "Moldova", subzone: "Muntii Tarcau si Valea Siretului" },
  BIHOR: { regionId: "transilvania", name: "Transilvania", subzone: "Crisana" },
  BISTRITA_NASAUD: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tinutul Nasaudului"
  },
  BOTOSANI: { regionId: "moldova", name: "Moldova", subzone: "Campia Moldovei de Nord" },
  BRAILA: { regionId: "moldova", name: "Moldova", subzone: "Campia Brailei" },
  BRASOV: { regionId: "transilvania", name: "Transilvania", subzone: "Tara Barsei" },
  BUCURESTI: { regionId: "muntenia", name: "Muntenia", subzone: "Bucuresti si imprejurimi" },
  BUZAU: { regionId: "muntenia", name: "Muntenia", subzone: "Subzona Buzaului" },
  CALARASI: { regionId: "muntenia", name: "Muntenia", subzone: "Campia Dunarii (Baragan)" },
  CARAS_SEVERIN: { regionId: "banat", name: "Banat", subzone: "Almajului si Portile de Fier" },
  CLUJ: { regionId: "transilvania", name: "Transilvania", subzone: "Dealurile Clujului" },
  CONSTANTA: { regionId: "dobrogea", name: "Dobrogea", subzone: "Litoralul Dobrogean" },
  COVASNA: { regionId: "transilvania", name: "Transilvania", subzone: "Tara Barsei si Odorhei" },
  DAMBOVITA: { regionId: "muntenia", name: "Muntenia", subzone: "Subzona Dambovitei" },
  DOLJ: { regionId: "oltenia", name: "Oltenia", subzone: "Campia Doljului" },
  GALATI: { regionId: "moldova", name: "Moldova", subzone: "Campia Dunarii de Est" },
  GIURGIU: { regionId: "muntenia", name: "Muntenia", subzone: "Campia Dunarii (Vlasca)" },
  GORJ: { regionId: "oltenia", name: "Oltenia", subzone: "Subcarpatii Gorjului" },
  HARGHITA: { regionId: "transilvania", name: "Transilvania", subzone: "Odorhei si zona montana" },
  HUNEDOARA: { regionId: "transilvania", name: "Transilvania", subzone: "Padureni - Hunedoara" },
  IALOMITA: { regionId: "muntenia", name: "Muntenia", subzone: "Baragan (Campia Romana)" },
  IASI: { regionId: "moldova", name: "Moldova", subzone: "Depresiunea Jijiei si Cotnari" },
  ILFOV: { regionId: "muntenia", name: "Muntenia", subzone: "Campia Bucurestiului" },
  MARAMURES: { regionId: "transilvania", name: "Transilvania", subzone: "Maramuresul Istoric" },
  MEHEDINTI: { regionId: "oltenia", name: "Oltenia", subzone: "Plaiul Closani si Clisura Dunarii" },
  MURES: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Muresul Superior si Valea Gurghiului"
  },
  NEAMT: { regionId: "moldova", name: "Moldova", subzone: "Zona Neamtului carpatica" },
  OLT: { regionId: "oltenia", name: "Oltenia", subzone: "Romanati" },
  PRAHOVA: { regionId: "muntenia", name: "Muntenia", subzone: "Valea Prahovei" },
  SALAJ: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Codrul Salajului si Silvania"
  },
  SATU_MARE: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tara Oasului si Campia Satmarului"
  },
  SIBIU: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Marginimea Sibiului si Tara Oltului"
  },
  SUCEAVA: { regionId: "moldova", name: "Moldova", subzone: "Bucovina istorica" },
  TELEORMAN: { regionId: "muntenia", name: "Muntenia", subzone: "Teleorman si Vlasca" },
  TIMIS: { regionId: "banat", name: "Banat", subzone: "Campia Banatului" },
  TULCEA: { regionId: "dobrogea", name: "Dobrogea", subzone: "Delta Dunarii" },
  VALCEA: { regionId: "oltenia", name: "Oltenia", subzone: "Subzona Valcii si Tara Lovistei" },
  VASLUI: { regionId: "moldova", name: "Moldova", subzone: "Colinele Tutovei" },
  VRANCEA: { regionId: "moldova", name: "Moldova", subzone: "Putna si Valea Zabalei" }
};

/**
 * Normalizes a county name to a consistent format for matching against the map data.
 * This involves:
 * 1. Removing diacritics (e.g., 'ă', 'â', 'î', 'ș', 'ț').
 * 2. Converting to uppercase.
 * 3. Replacing sequences of non-alphanumeric characters with a single underscore.
 * 4. Trimming leading/trailing underscores.
 *
 * @param {string} value - The county name to normalize.
 * @returns {string} The normalized county name.
 */
function normalizeCountyName(value: string): string {
  return value
    .normalize("NFD") // Decompose characters (e.g., 'ă' -> 'a' + '◌̃')
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toUpperCase() // Convert to uppercase
    .replace(/[^A-Z0-9]+/g, "_") // Replace sequences of non-alphanumeric chars with a single underscore
    .replace(/^_+|_+$/g, ""); // Trim leading/trailing underscores
}

export function toEthnographicGeo(countyGeo: CountyFeatureCollection): RegionFeatureCollection {
  return {
    type: "FeatureCollection",
    features: countyGeo.features.map((feature) => {
      const normalizedCountyName = normalizeCountyName(feature.properties.shapeName);
      const region = countyToRegion[normalizedCountyName];
      
      if (!region) {
        console.warn(`County "${feature.properties.shapeName}" (normalized: "${normalizedCountyName}") is not mapped to an ethnographic region.`);
        return {
          ...feature,
          properties: {
            regionId: "unmapped", // This assignment is now type-safe
            name: "Unknown Region",
            county: feature.properties.shapeName,
            subzone: "N/A"
          }
        };
      }
      
      return {
        ...feature,
        properties: {
          regionId: region.regionId, // This is an EthnographicRegionId
          name: region.name,
          county: feature.properties.shapeName, 
          subzone: region.subzone
        }
      };
    })
  };
}
