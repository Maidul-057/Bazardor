import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bn, unitBn } from "@/lib/format";
import { ChangeBadge } from "@/components/ProductCard";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);
  const p = await getProduct(slug);
  if (!p) notFound();
  const markets = p.markets ?? [];
  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;
  const avg = markets.length ? Math.round(markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length) : p.today;
  const divisions = [...new Set(markets.map((m) => m.division))];
  const stats: [string, number][] = [["সর্বনিম্ন দাম", min], ["সর্বোচ্চ দাম", max], ["গড় দাম", avg], ["আজকের দাম", p.today]];
  const history: [string, number][] = [["গতকাল", p.yesterday], ["গত সপ্তাহ", p.lastWeek], ["গত মাস", p.lastMonth]];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="card bg-white shadow p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-6xl">{p.image}</span>
          <div>
            <h1 className="text-3xl font-bold">{p.nameBn}</h1>
            <p className="text-gray-500">{p.nameBn}-এর সারা দেশের বাজারদরের সারসংক্ষেপ</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              <span className="badge badge-success badge-outline">{p.categoryIcon} {p.categoryNameBn}</span>
              <span className="badge badge-ghost">{unitBn(p.unit)}</span>
              <ChangeBadge p={p} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(([l, v]) => (
          <div key={l} className="card bg-white shadow p-4">
            <div className="text-sm text-gray-500">{l}</div>
            <div className="text-2xl font-bold text-green-700">{bn(v)} টাকা</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {history.map(([l, v]) => (
          <div key={l} className="card bg-white shadow p-3">
            <div className="text-xs text-gray-500">{l}</div><div className="font-bold">{bn(v)} টাকা</div>
          </div>
        ))}
      </div>
      <div className="card bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
        {divisions.map((d) => (
          <div key={d} className="mb-4">
            <h3 className="font-semibold text-green-700 mb-1">{d} বিভাগ</h3>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead><tr><th>বাজার</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr></thead>
                <tbody>
                  {markets.filter((m) => m.division === d).map((m) => (
                    <tr key={m.market}><td>{m.market}</td><td>{bn(m.min)} টাকা</td><td>{bn(m.max)} টাকা</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
