/**
 * Wilson score interval for a binomial proportion. Unlike the naive ±1.96·SE
 * interval it behaves well for small samples and for rates near 0% or 100%,
 * which is exactly the regime of "was the brand mentioned in k of n answers".
 */
export function wilson(k: number, n: number, z = 1.96): [number, number] {
  if (n === 0) return [0, 0];
  const p = k / n;
  const denom = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denom;
  const margin = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / denom;
  return [Math.max(0, center - margin), Math.min(1, center + margin)];
}

export const pct = (x: number) => Math.round(x * 100);
