import "../globals.css";
import { buildMetadata } from "@/lib/site";
import { display, mono, sans } from "../fonts";

export const metadata = buildMetadata("tr");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
