import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Citeable: Yapay zekâ arama görünürlüğü denetimi";

export default function Image() {
  return ogImage("tr");
}
