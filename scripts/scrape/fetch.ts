import fs from "node:fs/promises";
import path from "node:path";
import allowlistConfig from "../sources/allowlist.json" with { type: "json" };
import { paths } from "../lib/paths.ts";
import { rateLimit } from "../lib/rate-limit.ts";

export type AllowlistConfig = {
  domains: string[];
  rateLimitMs: number;
  userAgent: string;
};

const config = allowlistConfig as AllowlistConfig;

function assertAllowedUrl(url: string): URL {
  const parsed = new URL(url);
  const allowed = config.domains.some(
    (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
  );
  if (!allowed) {
    throw new Error(`Domain not in allowlist: ${parsed.hostname}`);
  }
  return parsed;
}

function cacheKeyForUrl(url: string): string {
  return url.replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 180);
}

export async function fetchCached(
  url: string,
  options?: { force?: boolean }
): Promise<{ html: string; fromCache: boolean; retrievedAt: string }> {
  assertAllowedUrl(url);
  await rateLimit(config.rateLimitMs);

  const cachePath = path.join(paths.rawDir, `${cacheKeyForUrl(url)}.html`);
  await fs.mkdir(paths.rawDir, { recursive: true });

  if (!options?.force) {
    try {
      const cached = await fs.readFile(cachePath, "utf8");
      const metaPath = `${cachePath}.meta.json`;
      const metaRaw = await fs.readFile(metaPath, "utf8");
      const meta = JSON.parse(metaRaw) as { retrievedAt: string };
      return { html: cached, fromCache: true, retrievedAt: meta.retrievedAt };
    } catch {
      // cache miss
    }
  }

  const response = await fetch(url, {
    headers: { "User-Agent": config.userAgent }
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }
  const html = await response.text();
  const retrievedAt = new Date().toISOString();
  await fs.writeFile(cachePath, html, "utf8");
  await fs.writeFile(`${cachePath}.meta.json`, JSON.stringify({ url, retrievedAt }, null, 2));
  return { html, fromCache: false, retrievedAt };
}

export async function fetchJsonCached<T>(
  url: string,
  options?: { force?: boolean }
): Promise<{ data: T; fromCache: boolean; retrievedAt: string }> {
  assertAllowedUrl(url);
  await rateLimit(config.rateLimitMs);

  const cachePath = path.join(paths.rawDir, `${cacheKeyForUrl(url)}.json`);
  await fs.mkdir(paths.rawDir, { recursive: true });

  if (!options?.force) {
    try {
      const cached = await fs.readFile(cachePath, "utf8");
      const metaPath = `${cachePath}.meta.json`;
      const metaRaw = await fs.readFile(metaPath, "utf8");
      const meta = JSON.parse(metaRaw) as { retrievedAt: string };
      return { data: JSON.parse(cached) as T, fromCache: true, retrievedAt: meta.retrievedAt };
    } catch {
      // cache miss
    }
  }

  const response = await fetch(url, {
    headers: { "User-Agent": config.userAgent }
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }
  const data = (await response.json()) as T;
  const retrievedAt = new Date().toISOString();
  await fs.writeFile(cachePath, JSON.stringify(data, null, 2), "utf8");
  await fs.writeFile(`${cachePath}.meta.json`, JSON.stringify({ url, retrievedAt }, null, 2));
  return { data, fromCache: false, retrievedAt };
}

export function getAllowlistConfig(): AllowlistConfig {
  return config;
}
