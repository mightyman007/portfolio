/**
 * Contact-form rate limiting.
 *
 * Production: Upstash Redis (free tier = 500K commands/month; a check is ~2
 * commands, so this would survive ~250K form submissions/month).
 *
 * Local dev / not-configured: best-effort in-memory sliding window so the
 * form works without an Upstash account.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const upstashLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 submissions/hour per IP
      prefix: "rl:contact",
    })
  : null;

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const memoryBuckets = new Map<string, number[]>();

async function memoryLimit(key: string): Promise<boolean> {
  const now = Date.now();
  const recent = (memoryBuckets.get(key) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (recent.length >= MAX_PER_WINDOW) {
    memoryBuckets.set(key, recent);
    return false;
  }
  recent.push(now);
  memoryBuckets.set(key, recent);
  return true;
}

export type RateLimitResult = { success: boolean; remaining: number };

export async function checkContactRateLimit(ip: string): Promise<RateLimitResult> {
  if (upstashLimiter) {
    const r = await upstashLimiter.limit(ip);
    return { success: r.success, remaining: r.remaining };
  }
  return { success: await memoryLimit(ip), remaining: 0 };
}
