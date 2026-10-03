const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const MAX_TRACKED_CLIENTS = 5_000;

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = hits.get(clientId);

  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_CLIENTS) {
      for (const [key, value] of hits) {
        if (value.resetAt <= now) hits.delete(key);
      }
    }
    hits.set(clientId, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
