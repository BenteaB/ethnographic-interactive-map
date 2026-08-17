let lastRequestAt = 0;

export async function rateLimit(ms: number): Promise<void> {
  const now = Date.now();
  const wait = Math.max(0, lastRequestAt + ms - now);
  if (wait > 0) {
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  lastRequestAt = Date.now();
}

export function resetRateLimit(): void {
  lastRequestAt = 0;
}
