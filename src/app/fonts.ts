import { Geist, Geist_Mono } from "next/font/google";

// One clean family, used the way Apple uses SF Pro: tight display sizes, relaxed text sizes.
export const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
export const display = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-display" });
export const mono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });
