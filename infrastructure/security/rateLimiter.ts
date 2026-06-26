type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: limit - 1,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  current.count += 1;

  return {
    allowed: true,
    remaining: limit - current.count,
  };
}