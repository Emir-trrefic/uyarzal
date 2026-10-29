export type Status = "pass" | "warn" | "fail";

export type Category = "access" | "structure" | "content" | "trust" | "technical" | "agent";

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
  /** /llms-full.txt: the site's full content as Markdown, for agents. */
  llmsFullTxt?: string | null;
  sitemapFound: boolean;
}

export interface PageResult {
  url: string;
  status: number;
  score: number;
  grade: Grade;
  /** Titles of the failing checks, worst first. */
  issues: string[];
}

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface AuditReport {
  lang: "en" | "tr";
  url: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  grade: Grade;
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
  /** Additional pages scanned from the sitemap (multi-page audits only). */
  pages?: PageResult[];
  /** Average page score across the home page and `pages`. */
  siteScore?: number;
  generated: {
    llmsTxt: string;
    jsonLd: string;
    robotsTxt: string;
  };
}
