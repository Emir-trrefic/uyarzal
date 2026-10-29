import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

export const sans = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
export const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-display" });
export const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });
