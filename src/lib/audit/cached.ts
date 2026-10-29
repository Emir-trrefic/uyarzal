import { TtlCache } from "../cache";
import { type AuditOptions, normalizeUrl, runAudit } from "./index";
import type { AuditReport } from "./types";

const cache = new TtlCache<AuditReport>(10 * 60 * 1000);

/** runAudit with a 10-minute cache keyed by URL, language and page count. */
export async function cachedAudit(input: string, opts: AuditOptions = {}): Promise<AuditReport> {
  const key = `${normalizeUrl(input)}|${opts.lang ?? "en"}|${opts.maxPages ?? 1}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const report = await runAudit(input, opts);
  cache.set(key, report);
  return report;
}
