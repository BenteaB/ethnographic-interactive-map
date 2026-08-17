const LOCAL_SOURCE_PREFIXES = ["file://", "http://localhost", "https://localhost"] as const;

export function collectSourceUrls(value: unknown): string[] {
  const urls: string[] = [];

  function walk(node: unknown): void {
    if (!node || typeof node !== "object") return;

    if ("url" in node && typeof node.url === "string") {
      urls.push(node.url);
    }

    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }

    Object.values(node).forEach(walk);
  }

  walk(value);
  return urls;
}

export function findLocalSourceUrls(value: unknown): string[] {
  return collectSourceUrls(value).filter((url) =>
    LOCAL_SOURCE_PREFIXES.some((prefix) => url.startsWith(prefix))
  );
}
