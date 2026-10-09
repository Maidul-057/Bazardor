export type Market = { market: string; division: string; min: number; max: number };
export type Product = {
  id: number; slug: string; nameBn: string; category: string; categoryNameBn: string;
  categoryIcon: string; unit: string; image: string; today: number; yesterday: number;
  lastWeek: number; lastMonth: number; change?: { dir: "up" | "down" | "flat"; pct: number };
  markets?: Market[];
};
export type Category = { id: number; slug: string; nameBn: string; icon: string };

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get(path: string) {
  for (const b of BASES) {
    try {
      const r = await fetch(b + path, { next: { revalidate: 300 } });
      if (r.ok) return await r.json();
    } catch {}
  }
  throw new Error("API unavailable");
}
const list = (j: any) => (Array.isArray(j) ? j : j.data ?? j.items ?? []);

export const getProducts = async (): Promise<Product[]> => list(await get("/products"));
export const getCategories = async (): Promise<Category[]> => list(await get("/categories"));
export async function getProduct(slug: string): Promise<Product | null> {
  const p = (await getProducts()).find((x) => x.slug === slug);
  if (!p) return null;
  const j = await get(`/products/${p.id}`);
  return { ...p, ...(j.data ?? j) };
}
