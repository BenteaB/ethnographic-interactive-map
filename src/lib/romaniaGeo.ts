import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { RegionId as EthnographicRegionId } from "@/types/region"; // Alias to avoid conflict

export type RegionId = EthnographicRegionId | "unmapped"; // Union type including "unmapped"

export type RegionFeatureProperties = {
  regionId: RegionId;
  name: string;
  county: string;
  subzone: string;
  historicalRegion: string;
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
  regionId: EthnographicRegionId;
  name: string;
  subzone: string;
  historicalRegion: string;
};

export type RegionFeatureCollection = FeatureCollection<
  Polygon | MultiPolygon,
  RegionFeatureProperties
>;

// Mapping of normalized county names to ethnographic regions, 
// now updated to include the 22 historical regions from the provided PDF.
export const countyToRegion: Record<string, RegionMeta> = {
  ALBA: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Podisul Tarnavelor",
    historicalRegion: "Ţara Moţilor"
  },
  ARAD: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Crisana (Campia Aradului)",
    historicalRegion: "Câmpia Timişului şi Câmpia Aradului"
  },
  ARGES: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Arges si Muscel",
    historicalRegion: "Bran"
  },
  BACAU: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Muntii Tarcau si Valea Siretului",
    historicalRegion: "Moldova Centrală"
  },
  BIHOR: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Crisana",
    historicalRegion: "Câmpia Timişului şi Câmpia Aradului"
  },
  BISTRITA_NASAUD: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tinutul Nasaudului",
    historicalRegion: "Ţinutul Năsăudului"
  },
  BOTOSANI: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Campia Moldovei de Nord",
    historicalRegion: "Moldova de Nord"
  },
  BRAILA: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Campia Brailei",
    historicalRegion: "Sudul Munteniei"
  },
  BRASOV: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tara Barsei",
    historicalRegion: "Ţara Făgăraşului"
  },
  BUCURESTI: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Bucuresti si imprejurimi",
    historicalRegion: "Sudul Munteniei"
  },
  BUZAU: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Subzona Buzaului",
    historicalRegion: "Valea Prahovei"
  },
  CALARASI: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Campia Dunarii (Baragan)",
    historicalRegion: "Sudul Munteniei"
  },
  CARAS_SEVERIN: {
    regionId: "banat",
    name: "Banat",
    subzone: "Almajului si Portile de Fier",
    historicalRegion: "Câmpia Timişului şi Câmpia Aradului"
  },
  CLUJ: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Dealurile Clujului",
    historicalRegion: "Dealurile Clujului"
  },
  CONSTANTA: {
    regionId: "dobrogea",
    name: "Dobrogea",
    subzone: "Litoralul Dobrogean",
    historicalRegion: "Tulcea şi Delta Dunării"
  },
  COVASNA: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tara Barsei si Odorhei",
    historicalRegion: "Harghita – Covasna"
  },
  DAMBOVITA: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Subzona Dambovitei",
    historicalRegion: "Muscelele Argeşului"
  },
  DOLJ: {
    regionId: "oltenia",
    name: "Oltenia",
    subzone: "Campia Doljului",
    historicalRegion: "Câmpia Olteniei"
  },
  GALATI: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Campia Dunarii de Est",
    historicalRegion: "Moldova Centrală"
  },
  GIURGIU: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Campia Dunarii (Vlasca)",
    historicalRegion: "Sudul Munteniei"
  },
  GORJ: {
    regionId: "oltenia",
    name: "Oltenia",
    subzone: "Subcarpatii Gorjului",
    historicalRegion: "Gorj"
  },
  HARGHITA: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Odorhei si zona montana",
    historicalRegion: "Harghita – Covasna"
  },
  HUNEDOARA: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Padureni - Hunedoara",
    historicalRegion: "Ţara Haţegului"
  },
  IALOMITA: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Baragan (Campia Romana)",
    historicalRegion: "Sudul Munteniei"
  },
  IASI: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Depresiunea Jijiei si Cotnari",
    historicalRegion: "Moldova Centrală"
  },
  ILFOV: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Campia Bucurestiului",
    historicalRegion: "Sudul Munteniei"
  },
  MARAMURES: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Maramuresul Istoric",
    historicalRegion: "Maramureş"
  },
  MEHEDINTI: {
    regionId: "oltenia",
    name: "Oltenia",
    subzone: "Plaiul Closani si Clisura Dunarii",
    historicalRegion: "Câmpia Olteniei"
  },
  MURES: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Muresul Superior si Valea Gurghiului",
    historicalRegion: "Podişul Târnavelor"
  },
  NEAMT: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Zona Neamtului carpatica",
    historicalRegion: "Ţinutul Neamţului"
  },
  OLT: {
    regionId: "oltenia",
    name: "Oltenia",
    subzone: "Romanati",
    historicalRegion: "Câmpia Olteniei"
  },
  PRAHOVA: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Valea Prahovei",
    historicalRegion: "Valea Prahovei"
  },
  SALAJ: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Codrul Salajului si Silvania",
    historicalRegion: "Dealurile Clujului"
  },
  SATU_MARE: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Tara Oasului si Campia Satmarului",
    historicalRegion: "Ţara Oaşului"
  },
  SIBIU: {
    regionId: "transilvania",
    name: "Transilvania",
    subzone: "Marginimea Sibiului si Tara Oltului",
    historicalRegion: "Mărginimea Sibiului"
  },
  SUCEAVA: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Bucovina istorica",
    historicalRegion: "Obcinele Sucevei"
  },
  TELEORMAN: {
    regionId: "muntenia",
    name: "Muntenia",
    subzone: "Teleorman si Vlasca",
    historicalRegion: "Sudul Munteniei"
  },
  TIMIS: {
    regionId: "banat",
    name: "Banat",
    subzone: "Campia Banatului",
    historicalRegion: "Câmpia Timişului şi Câmpia Aradului"
  },
  TULCEA: {
    regionId: "dobrogea",
    name: "Dobrogea",
    subzone: "Delta Dunarii",
    historicalRegion: "Tulcea şi Delta Dunării"
  },
  VALCEA: {
    regionId: "oltenia",
    name: "Oltenia",
    subzone: "Subzona Valcii si Tara Lovistei",
    historicalRegion: "Vâlcea"
  },
  VASLUI: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Colinele Tutovei",
    historicalRegion: "Moldova Centrală"
  },
  VRANCEA: {
    regionId: "moldova",
    name: "Moldova",
    subzone: "Putna si Valea Zabalei",
    historicalRegion: "Vrancea"
  }
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
            regionId: "unmapped",
            name: "Unknown Region",
            county: feature.properties.shapeName,
            subzone: "N/A",
            historicalRegion: "N/A"
          }
        };
      }
      
      return {
        ...feature,
        properties: {
          regionId: region.regionId,
          name: region.name,
          county: feature.properties.shapeName, 
          subzone: region.subzone,
          historicalRegion: region.historicalRegion
        }
      };
    })
  };
}

