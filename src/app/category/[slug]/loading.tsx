import { GridSkeleton } from "@/components/ProductCard";
export default function Loading() {
  return <div className="max-w-6xl mx-auto px-4 py-8"><div className="skeleton h-10 w-48 mb-6" /><GridSkeleton n={8} /></div>;
}
