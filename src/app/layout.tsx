import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin", "latin-ext"], variable: "--font-display" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://citeable.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Citeable — Get recommended by ChatGPT, Claude & Perplexity",
  description:
    "Free GEO audit: see whether AI assistants can find, understand and cite your website, then fix it with generated llms.txt, JSON-LD and robots.txt.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Citeable — AI search visibility audit",
    description: "Is ChatGPT recommending you, or your competitor? Find out in 10 seconds.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
