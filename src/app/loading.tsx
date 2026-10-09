import { GridSkeleton } from "@/components/ProductCard";
export default function Loading() {
  return <div className="max-w-6xl mx-auto px-4 py-8"><div className="skeleton h-56 w-full mb-8" /><GridSkeleton n={8} /></div>;
}
