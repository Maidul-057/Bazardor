import type { Product } from "@/lib/api";
import { bn, getChange, unitBn } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products];
  return (
    <div className="bg-green-800 text-white overflow-hidden py-2 text-sm">
      <div className="marquee">
        {items.map((p, i) => {
          const c = getChange(p);
          const color = c.dir === "up" ? "text-green-300" : c.dir === "down" ? "text-red-300" : "text-gray-300";
          return (
            <span key={i} className="mx-5 whitespace-nowrap">
              {p.image} {p.nameBn} <b>{bn(p.today)} টাকা</b>/{unitBn(p.unit).replace("প্রতি ", "")}{" "}
              <span className={color}>{c.dir === "up" ? "▲" : c.dir === "down" ? "▼" : "—"} {bn(c.pct, 1)}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
