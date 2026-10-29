import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Quovra: AI search visibility audit";

export default function Image() {
  return ogImage("en");
}
