"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductCard, { Grid } from "./ProductCard";

export default function SortedGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");
  const items = useMemo(() => {
    const a = [...products];
    if (sort === "asc") a.sort((x, y) => x.today - y.today);   // numeric, not string
    if (sort === "desc") a.sort((x, y) => y.today - x.today);
    return a;
  }, [products, sort]);
  return (
    <>
      <label className="flex items-center gap-2 mb-4">
        <span className="font-semibold">সাজান:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm sm:select-md">
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </label>
      <Grid>{items.map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
    </>
  );
}
