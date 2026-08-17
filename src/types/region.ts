import { z } from "zod";

export const regionIds = [
  "transilvania",
  "banat",
  "oltenia",
  "muntenia",
  "moldova",
  "dobrogea"
] as const;
export type RegionId = (typeof regionIds)[number];

export const sourceCitationSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1),
  retrievedAt: z.string().datetime(),
  license: z.string().optional(),
  excerpt: z.string().optional()
});

export const regionItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  sources: z.array(sourceCitationSchema).optional()
});

export const mediaAssetSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().optional(),
  sources: z.array(sourceCitationSchema).optional()
});

export const regionContentSchema = z.object({
  id: z.enum(regionIds),
  code: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  games: z.array(regionItemSchema).default([]),
  costumes: z.array(regionItemSchema).default([]),
  traditions: z.array(regionItemSchema).default([]),
  images: z.array(mediaAssetSchema).default([]),
  sources: z.array(sourceCitationSchema).default([])
});

export const subzoneContentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  macroRegionId: z.enum(regionIds),
  summary: z.string().min(1),
  geography: z.string().optional(),
  representativeVillages: z.array(z.string()).optional(),
  games: z.array(regionItemSchema).default([]),
  costumes: z.array(regionItemSchema).default([]),
  traditions: z.array(regionItemSchema).default([]),
  images: z.array(mediaAssetSchema).default([]),
  sources: z.array(sourceCitationSchema).default([])
});

export const draftStatusSchema = z.enum(["draft", "approved", "rejected"]);
export const confidenceSchema = z.enum(["high", "medium", "low"]);

export const contentDraftSchema = subzoneContentSchema.extend({
  status: draftStatusSchema,
  confidence: confidenceSchema,
  extractedFrom: z.array(sourceCitationSchema).default([]),
  notes: z.string().optional()
});

export const subzoneSeedSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  macroRegionId: z.enum(regionIds),
  historicalRegionNames: z.array(z.string()).min(1),
  etnomonZoneQueries: z.array(z.string()).min(1),
  wikiTitle: z.string().optional(),
  pdfSection: z.number().int().positive().optional()
});

export const subzoneSeedsFileSchema = z.object({
  subzones: z.array(subzoneSeedSchema)
});

export type SourceCitation = z.infer<typeof sourceCitationSchema>;
export type RegionItem = z.infer<typeof regionItemSchema>;
export type MediaAsset = z.infer<typeof mediaAssetSchema>;
export type RegionContent = z.infer<typeof regionContentSchema>;
export type SubzoneContent = z.infer<typeof subzoneContentSchema>;
export type ContentDraft = z.infer<typeof contentDraftSchema>;
export type SubzoneSeed = z.infer<typeof subzoneSeedSchema>;

export type RegionSelectionContext = {
  county: string;
  subzone: string;
};
