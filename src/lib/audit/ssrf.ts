import { lookup } from "node:dns/promises";
import net from "node:net";

export type UnsafeUrlCode = "empty" | "invalid" | "protocol" | "credentials" | "public-domain" | "private" | "unresolved";

export class UnsafeUrlError extends Error {
  constructor(message: string, public code: UnsafeUrlCode = "invalid") {
    super(message);
  }
}

const TR_MESSAGES: Record<UnsafeUrlCode, string> = {
  empty: "Lütfen bir adres girin.",
  invalid: "Bu geçerli bir web adresine benzemiyor.",
  protocol: "Sadece http ve https adresleri destekleniyor.",
  credentials: "Kullanıcı adı/şifre içeren adreslere izin verilmiyor.",
  "public-domain": "Lütfen herkese açık bir alan adı kullanın.",
  private: "Özel ağlardaki adresler denetlenemez.",
  unresolved: "Bu alan adı bulunamadı.",
};

export function localizedUrlError(err: UnsafeUrlError, lang: "en" | "tr"): string {
  return lang === "tr" ? TR_MESSAGES[err.code] : err.message;
}

/** Normalises user input into an absolute http(s) URL. */
export function normalizeUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed) throw new UnsafeUrlError("Please enter a URL.", "empty");
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    throw new UnsafeUrlError("Only http and https URLs are supported.", "protocol");
  }
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new UnsafeUrlError("That does not look like a valid URL.", "invalid");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new UnsafeUrlError("Only http and https URLs are supported.", "protocol");
  }
  if (url.username || url.password) throw new UnsafeUrlError("URLs with credentials are not allowed.", "credentials");
  if (!url.hostname.includes(".")) throw new UnsafeUrlError("Please use a public domain name.", "public-domain");
  url.hash = "";
  return url;
}

export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith("::ffff:")) return isPrivateIp(v6.slice(7));
  return v6 === "::" || v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe80");
}

/** Rejects hosts that resolve to loopback, private or link-local ranges. */
export async function assertPublicHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal")) {
    throw new UnsafeUrlError("Private hosts cannot be audited.", "private");
  }
  const addresses = net.isIP(host) ? [{ address: host }] : await lookup(host, { all: true }).catch(() => []);
  if (addresses.length === 0) throw new UnsafeUrlError(`Could not resolve ${host}.`, "unresolved");
  if (addresses.some((a) => isPrivateIp(a.address))) {
    throw new UnsafeUrlError("Private hosts cannot be audited.", "private");
  }
}
