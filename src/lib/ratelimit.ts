/**
 * Fixed-window, in-memory rate limiter. Good enough for a single instance;
 * swap for Redis/Upstash when running multiple replicas.
 */
const windows = new Map<string, { start: number; count: number }>();
const WINDOW_MS = 60 * 60 * 1000;

export function rateLimit(key: string, limit = Number(process.env.RATE_LIMIT_PER_HOUR ?? 20)) {
  const now = Date.now();
  const w = windows.get(key);
  if (!w || now - w.start > WINDOW_MS) {
    windows.set(key, { start: now, count: 1 });
    return { ok: true, remaining: limit - 1 };
  }
  w.count++;
  return { ok: w.count <= limit, remaining: Math.max(0, limit - w.count) };
}

export function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "anonymous";
}
