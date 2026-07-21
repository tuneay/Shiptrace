type RateLimitOptions = {
  limit: number;
  windowMs: number;
  now?: number;
};

declare global {
  var __shiptraceRateLimits: Map<string, number[]> | undefined;
}

const attempts = globalThis.__shiptraceRateLimits ?? new Map<string, number[]>();
globalThis.__shiptraceRateLimits = attempts;

export function consumeRateLimit(key: string, options: RateLimitOptions) {
  const now = options.now ?? Date.now();
  const cutoff = now - options.windowMs;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > cutoff);
  const allowed = recent.length < options.limit;
  if (allowed) recent.push(now);
  attempts.set(key, recent);
  return { allowed, remaining: Math.max(0, options.limit - recent.length) };
}

export function clearRateLimits() {
  if (process.env.NODE_ENV === "production") return;
  attempts.clear();
}
