/**
 * Regional price points. These are set per market, not converted at the
 * exchange rate, so each currency shows a round, locally sensible price.
 * Yearly prices are the per-month equivalent with two months free.
 */
export type Currency = "USD" | "EUR" | "GBP" | "TRY";
export type PlanId = "free" | "starter" | "growth" | "agency";

export const CURRENCIES: { code: Currency; symbol: string; locale: string }[] = [
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
  { code: "TRY", symbol: "₺", locale: "tr-TR" },
];

export const PRICES: Record<PlanId, Record<Currency, { monthly: number; yearly: number }>> = {
  free: { USD: { monthly: 0, yearly: 0 }, EUR: { monthly: 0, yearly: 0 }, GBP: { monthly: 0, yearly: 0 }, TRY: { monthly: 0, yearly: 0 } },
  starter: { USD: { monthly: 24, yearly: 20 }, EUR: { monthly: 22, yearly: 18 }, GBP: { monthly: 19, yearly: 16 }, TRY: { monthly: 790, yearly: 660 } },
  growth: { USD: { monthly: 59, yearly: 49 }, EUR: { monthly: 55, yearly: 46 }, GBP: { monthly: 49, yearly: 41 }, TRY: { monthly: 1990, yearly: 1660 } },
  agency: { USD: { monthly: 179, yearly: 149 }, EUR: { monthly: 169, yearly: 139 }, GBP: { monthly: 149, yearly: 124 }, TRY: { monthly: 5990, yearly: 4990 } },
};

/** One-time done-for-you setup, starting price. */
export const SETUP_FROM: Record<Currency, number> = { USD: 149, EUR: 139, GBP: 119, TRY: 4900 };

const EURO_LANGS = ["de", "fr", "es", "it", "nl", "pt", "fi", "el", "sk", "sl", "et", "lv", "lt", "ga", "mt", "hr"];

/** Best-guess currency from the browser's languages and time zone. */
export function guessCurrency(languages: readonly string[], timeZone = ""): Currency {
  const primary = (languages[0] ?? "").toLowerCase();
  if (primary.startsWith("tr") || timeZone === "Europe/Istanbul") return "TRY";
  if (primary === "en-gb" || timeZone === "Europe/London") return "GBP";
  if (EURO_LANGS.includes(primary.split("-")[0])) return "EUR";
  if (timeZone.startsWith("Europe/")) return "EUR";
  return "USD";
}

export function formatMoney(amount: number, currency: Currency): string {
  const c = CURRENCIES.find((x) => x.code === currency)!;
  const n = new Intl.NumberFormat(c.locale, { maximumFractionDigits: 0 }).format(amount);
  return currency === "EUR" ? `${n} €` : `${c.symbol}${n}`;
}
