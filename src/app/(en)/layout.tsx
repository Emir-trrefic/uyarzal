import "../globals.css";
import { buildMetadata } from "@/lib/site";
import { display, sans } from "../fonts";

export const metadata = buildMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
