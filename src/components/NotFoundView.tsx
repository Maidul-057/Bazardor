import Link from "next/link";
export default function NotFoundView({ text = "দুঃখিত, পাতাটি খুঁজে পাওয়া যায়নি।" }: { text?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl">🧺</div>
      <h1 className="text-5xl font-bold mt-4">৪০৪</h1>
      <p className="mt-2 text-gray-600">{text}</p>
      <Link href="/" className="btn btn-success text-white mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
