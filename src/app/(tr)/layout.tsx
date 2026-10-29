import "../globals.css";
import { buildMetadata } from "@/lib/site";
import { display, sans } from "../fonts";

export const metadata = buildMetadata("tr");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
