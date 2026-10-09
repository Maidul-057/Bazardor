import { getCategories, getProducts } from "@/lib/api";
import NotFoundView from "@/components/NotFoundView";
import SortedGrid from "@/components/SortedGrid";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cats, all] = await Promise.all([getCategories(), getProducts()]);
  const cat = cats.find((c) => c.slug === slug);
  const items = all.filter((p) => p.category === slug);
  if (!cat || !items.length) return <NotFoundView text="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।" />;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{cat.icon} {cat.nameBn}</h1>
      <SortedGrid products={items} />
    </div>
  );
}
