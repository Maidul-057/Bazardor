"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const path = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);

  const link = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
      active ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100"}`;

  async function logout() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-2">
          <Link href="/" className="leading-tight">
            <div className="text-xl font-bold text-green-700">🛒 বাজার দর</div>
            <div className="text-xs text-gray-500 min-h-4">{date}</div>
          </Link>
          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-24" />
            ) : session ? (
              <>
                <Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">👤 {session.user.name.split(" ")[0]}</Link>
                <button onClick={logout} className="btn btn-sm sm:btn-md btn-outline btn-error">সাইন আউট</button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline btn-success">সাইন ইন</Link>
                <Link href="/signup" className="btn btn-sm sm:btn-md btn-success text-white">সাইন আপ</Link>
              </>
            )}
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-3 md:justify-center">
          <Link href="/" className={link(path === "/")}>🏠 সব পণ্য</Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={link(path === `/category/${c.slug}`)}>
              {c.icon} {c.nameBn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
