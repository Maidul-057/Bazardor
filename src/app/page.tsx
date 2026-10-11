import Image from "next/image";
import heroImage from "@/assests/bazar-hero.png";
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
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  const rank = (dir: string) =>
    all.filter((p) => getChange(p).dir === dir).sort((a, b) => getChange(b).pct - getChange(a).pct).slice(0, 6);
  return (
    <>
      <section className="bg-[#f1f7f1] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid w-full items-center gap-5 rounded-2xl border border-[#dce7de] bg-[#fbfdfb] p-5 sm:p-8 md:min-h-81 md:grid-cols-[1.35fr_0.65fr] md:px-8 md:py-8">
            <div className="text-left">
              <p className="inline-flex rounded-full bg-[#e3f2e8] px-3 py-1 text-sm font-semibold text-green-700">{today}</p>
              <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight">আজকের বাজারের দাম এক নজরে</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তৃত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।</p>
              <a href="#সব-পণ্য" className="btn btn-sm btn-success mt-5 text-white">সব পণ্য দেখুন</a>
            </div>
            <div className="mx-auto w-full max-w-60">
              <Image
                src={heroImage}
                alt="রঙিন সবজিতে ভরা বাজারের ঝুড়ি"
                priority
                className="h-auto w-full object-contain"
              />
            </div>
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
