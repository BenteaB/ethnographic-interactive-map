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

export const regionItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1)
});

export const mediaAssetSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().optional()
});

export const regionContentSchema = z.object({
  id: z.enum(regionIds),
  code: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  games: z.array(regionItemSchema).default([]),
  costumes: z.array(regionItemSchema).default([]),
  traditions: z.array(regionItemSchema).default([]),
  images: z.array(mediaAssetSchema).default([])
});

export type RegionItem = z.infer<typeof regionItemSchema>;
export type MediaAsset = z.infer<typeof mediaAssetSchema>;
export type RegionContent = z.infer<typeof regionContentSchema>;

export type RegionSelectionContext = {
  county: string;
  subzone: string;
};
