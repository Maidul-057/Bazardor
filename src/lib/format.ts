import type { Product } from "./api";
export const bn = (n: number, d = 0) =>
  n.toLocaleString("bn-BD", { minimumFractionDigits: d, maximumFractionDigits: d });
const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি", litre: "প্রতি লিটার", liter: "প্রতি লিটার", l: "প্রতি লিটার",
  dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস", hali: "প্রতি হালি",
};
export const unitBn = (u: string) => UNITS[u?.toLowerCase()] ?? `প্রতি ${u}`;
export function getChange(p: Product) {
  if (p.change) return p.change;
  const pct = p.yesterday ? Math.round(((p.today - p.yesterday) / p.yesterday) * 1000) / 10 : 0;
  return { dir: pct > 0 ? "up" : pct < 0 ? "down" : "flat", pct: Math.abs(pct) } as const;
}
