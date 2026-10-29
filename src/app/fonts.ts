import { JetBrains_Mono, Manrope, Urbanist } from "next/font/google";

// Softmain family: a heavy geometric display face, a clean humanist sans for text.
export const sans = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
export const display = Urbanist({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800", "900"], variable: "--font-display" });
export const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });
