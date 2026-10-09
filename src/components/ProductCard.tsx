import Link from "next/link";
import type { Product } from "@/lib/api";
import { bn, getChange, unitBn } from "@/lib/format";

export function ChangeBadge({ p }: { p: Product }) {
  const c = getChange(p);
  const cls = c.dir === "up" ? "bg-green-100 text-green-700" : c.dir === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600";
  const sym = c.dir === "up" ? "▲" : c.dir === "down" ? "▼" : "—";
  return <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${cls}`}>{sym} {bn(c.pct, 1)}%</span>;
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="card bg-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="card-body p-4 gap-1">
        <div className="text-4xl">{p.image}</div>
        <h3 className="font-bold text-lg">{p.nameBn}</h3>
        <p className="text-sm text-gray-500">{unitBn(p.unit)}</p>
        <div className="mt-2 flex items-center justify-between border-t pt-2">
          <div>
            <div className="text-xs text-gray-400">আজকের দাম</div>
            <div className="font-bold text-red-600">{bn(p.today)} টাকা</div>
          </div>
          <ChangeBadge p={p} />
        </div>
      </div>
    </Link>
  );
}

export const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{children}</div>
);

export const GridSkeleton = ({ n = 8 }: { n?: number }) => (
  <Grid>{Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-40 w-full" />)}</Grid>
);
