import { z } from "zod";

export const regionIds = ["maramures", "moldova", "oltenia"] as const;
export type RegionId = (typeof regionIds)[number];

export type RegionCode = "RO-MM" | "RO-MD" | "RO-OT";

export interface RegionItem {
  id: string;
  name: string;
  description: string;
}

export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  credit?: string;
}

export interface RegionContent {
  id: RegionId;
  code: RegionCode;
  name: string;
  summary: string;
  games: RegionItem[];
  costumes: RegionItem[];
  traditions: RegionItem[];
  images: MediaAsset[];
}

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
  code: z.enum(["RO-MM", "RO-MD", "RO-OT"]),
  name: z.string().min(1),
  summary: z.string().min(1),
  games: z.array(regionItemSchema).default([]),
  costumes: z.array(regionItemSchema).default([]),
  traditions: z.array(regionItemSchema).default([]),
  images: z.array(mediaAssetSchema).default([])
});
