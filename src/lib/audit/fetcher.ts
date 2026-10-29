import { assertPublicHost, UnsafeUrlError } from "./ssrf";
import type { PageSnapshot } from "./types";

export const USER_AGENT =
  "Mozilla/5.0 (compatible; CiteableBot/0.1; +https://github.com/Emir-trrefic/uyarzal)";

const MAX_BYTES = 3 * 1024 * 1024;
const MAX_REDIRECTS = 5;

export interface FetchOptions {
  timeoutMs?: number;
  /** Skip DNS/IP checks. Only for tests with an injected fetch. */
  skipHostCheck?: boolean;
  fetchImpl?: typeof fetch;
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks));
}

/** Fetches a URL, re-validating every redirect hop against private address ranges. */
export async function fetchPage(url: URL, opts: FetchOptions = {}): Promise<PageSnapshot> {
  const doFetch = opts.fetchImpl ?? fetch;
  const started = Date.now();
  let current = new URL(url);

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (!opts.skipHostCheck) await assertPublicHost(current);
    const res = await doFetch(current, {
      redirect: "manual",
      headers: { "user-agent": USER_AGENT, accept: "text/html,text/plain;q=0.9,*/*;q=0.5" },
      signal: AbortSignal.timeout(opts.timeoutMs ?? 10_000),
    });

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      current = new URL(res.headers.get("location")!, current);
      if (current.protocol !== "http:" && current.protocol !== "https:") {
        throw new UnsafeUrlError("Redirected to an unsupported protocol.");
      }
      continue;
    }

    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => (headers[k] = v));
    return {
      url: url.toString(),
      finalUrl: current.toString(),
      status: res.status,
      html: await readCapped(res),
      headers,
      responseMs: Date.now() - started,
    };
  }
  throw new Error("Too many redirects.");
}

/** Fetches a small text resource; returns null on any non-2xx or error. */
export async function fetchText(url: URL, opts: FetchOptions = {}): Promise<string | null> {
  try {
    const page = await fetchPage(url, { timeoutMs: 6_000, ...opts });
    if (page.status < 200 || page.status >= 300) return null;
    const type = page.headers["content-type"] ?? "";
    // Many sites answer unknown paths with their HTML shell (soft 404).
    if (type.includes("text/html") || /^\s*<(!doctype|html)/i.test(page.html)) return null;
    return page.html;
  } catch {
    return null;
  }
}
