export type Status = "pass" | "warn" | "fail";

export type Category = "access" | "structure" | "content" | "trust" | "technical";

export interface CheckResult {
  id: string;
  category: Category;
  title: string;
  status: Status;
  /** Points earned out of `weight`. */
  score: number;
  weight: number;
  detail: string;
  /** Concrete next step when the check is not passing. */
  fix?: string;
}

export interface BotAccess {
  bot: string;
  vendor: string;
  purpose: "search" | "training" | "user-fetch";
  allowed: boolean;
}

export interface PageSnapshot {
  url: string;
  finalUrl: string;
  status: number;
  html: string;
  headers: Record<string, string>;
  responseMs: number;
}

export interface SiteFiles {
  robotsTxt: string | null;
  llmsTxt: string | null;
  sitemapFound: boolean;
}

export interface AuditReport {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  categories: Record<Category, { score: number; max: number }>;
  checks: CheckResult[];
  bots: BotAccess[];
  page: {
    title: string | null;
    description: string | null;
    lang: string | null;
    wordCount: number;
    schemaTypes: string[];
  };
  generated: {
    llmsTxt: string;
    jsonLd: string;
    robotsTxt: string;
  };
}
