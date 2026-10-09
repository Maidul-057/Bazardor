import { getProducts } from "@/lib/api";
import ProductCard, { Grid } from "@/components/ProductCard";
import { getChange } from "@/lib/format";

const Section = ({ id, title, sub, children }: { id?: string; title: string; sub?: string; children: React.ReactNode }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 py-8 scroll-mt-32">
    <h2 className="text-2xl font-bold">{title}</h2>
    {sub && <p className="text-gray-500">{sub}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

export default async function Home() {
  const all = await getProducts();
  const rank = (dir: string) =>
    all.filter((p) => getChange(p).dir === dir).sort((a, b) => getChange(b).pct - getChange(a).pct).slice(0, 6);
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-green-700 font-semibold">আজকের বাজার দর</p>
            <h1 className="text-3xl sm:text-5xl font-bold mt-2 leading-tight">নিত্যপ্রয়োজনীয় পণ্যের দাম, এক নজরে</h1>
            <p className="text-gray-600 mt-4">চাল, ডাল, তেল, সবজি, মাছ-মাংস — সারা দেশের বাজারের সর্বশেষ দাম ও ওঠানামা জানুন।</p>
            <a href="#সব-পণ্য" className="btn btn-success text-white mt-6">সব পণ্যের দাম দেখুন ↓</a>
          </div>
          <div className="grid grid-cols-4 gap-3 text-4xl sm:text-5xl text-center bg-white/70 rounded-3xl p-6 shadow">
            {["🍚", "🫘", "🫙", "🥔", "🧅", "🌶️", "🐟", "🍗", "🥚", "🫚", "🧄", "🍅"].map((e) => <span key={e}>{e}</span>)}
          </div>
        </div>
      </section>
      <Section title="আজ দাম বেড়েছে ▲"><Grid>{rank("up").map((p) => <ProductCard key={p.id} p={p} />)}</Grid></Section>
      <Section title="আজ দাম কমেছে ▼"><Grid>{rank("down").map((p) => <ProductCard key={p.id} p={p} />)}</Grid></Section>
      <Section id="সব-পণ্য" title="সব পণ্য" sub="সব পণ্যের আজকের গড় দাম ও গতকালের তুলনায় পরিবর্তন">
        <Grid>{all.map((p) => <ProductCard key={p.id} p={p} />)}</Grid>
      </Section>
    </>
  );
}
