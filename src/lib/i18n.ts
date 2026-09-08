export const translations = {
  ro: {
    selectRegion: "Selectează o regiune",
    chooseRegion: "Alege o regiune evidențiată de pe hartă pentru a vedea jocurile, costumele și tradițiile tradiționale.",
    clearSelection: "Înapoi la hartă",
    representativeVillages: "Sate reprezentative",
    historicalRegion: "Regiune istorică",
    county: "Județ",
    games: "Jocuri",
    costumes: "Costume",
    traditions: "Tradiții",
    noItems: "Nu există elemente disponibile încă pentru această categorie.",
    images: "Imagini",
    noImages: "Nu există imagini disponibile încă.",
    sources: "Surse",
    noSources: "Nu există surse listate încă."
  },
  en: {
    selectRegion: "Select a region",
    chooseRegion: "Choose one highlighted region from the map to view traditional games, costumes, and traditions.",
    clearSelection: "Back to map",
    representativeVillages: "Representative villages",
    historicalRegion: "Historical Region",
    county: "County",
    games: "Games",
    costumes: "Costumes",
    traditions: "Traditions",
    noItems: "No items available yet for this category.",
    images: "Images",
    noImages: "No images available yet.",
    sources: "Sources",
    noSources: "No sources listed yet."
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ro;
