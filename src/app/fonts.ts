import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

export const sans = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
export const display = Newsreader({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-display" });
export const mono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-mono" });
