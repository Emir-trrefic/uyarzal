/** Shields-style SVG badge showing an AI visibility score. */
export function badgeSvg(score: number | null, grade: string | null, label = "AI visibility"): string {
  const value = score === null ? "n/a" : `${score} · ${grade}`;
  const color = score === null ? "#9f9f9f" : score >= 70 ? "#0b7a52" : score >= 45 ? "#b26b00" : "#cf3f3f";
  // Approximate text widths for Verdana 11px (~6.5px per char) plus padding.
  const lw = Math.round(label.length * 6.5 + 14);
  const vw = Math.round(value.length * 6.8 + 14);
  const w = lw + vw;
  const esc = (s: string) => s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20" role="img" aria-label="${esc(label)}: ${esc(value)}">
<title>${esc(label)}: ${esc(value)}</title>
<linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
<clipPath id="r"><rect width="${w}" height="20" rx="3" fill="#fff"/></clipPath>
<g clip-path="url(#r)"><rect width="${lw}" height="20" fill="#0b6b5d"/><rect x="${lw}" width="${vw}" height="20" fill="${color}"/><rect width="${w}" height="20" fill="url(#s)"/></g>
<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
<text x="${lw / 2}" y="14">${esc(label)}</text><text x="${lw + vw / 2}" y="14">${esc(value)}</text></g>
</svg>`;
}
