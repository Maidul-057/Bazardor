"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import logoIcon from "@/assests/logo-icon.png";
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
      active ? "bg-[#087d42] text-white" : "text-gray-700 hover:bg-green-100"}`;

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
          <Link href="/" className="flex items-center gap-2 leading-tight">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700">
              <Image src={logoIcon} alt="" aria-hidden="true" className="h-6 w-6 object-contain brightness-0 invert" />
            </span>
            <span>
              <span className="block text-xl font-bold text-green-700">বাজার দর</span>
              <span className="block min-h-4 text-xs text-gray-500">{date}</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-8 w-24" />
            ) : session ? (
              <details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold text-[#202923] transition hover:bg-green-50 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-7 w-11 items-center justify-center rounded-full bg-[#078a45] text-white">
                    {session.user.name.trim().charAt(0).toLowerCase() || "u"}
                  </span>
                  <span>{session.user.name.trim().split(/\s+/)[0] || "ব্যবহারকারী"}</span>
                  <span aria-hidden="true" className="text-xs text-gray-500">▾</span>
                </summary>
                <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#dce7de] bg-[#fbfdfb] p-5 shadow-lg">
                  <div className="mb-3">
                    <p className="font-semibold text-gray-500">{session.user.name}</p>
                    <p className="mt-0.5 break-all text-sm text-gray-400">{session.user.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 py-2 text-lg text-[#202923] hover:text-[#087d42]">
                    <span aria-hidden="true">👤</span>
                    আমার প্রোফাইল
                  </Link>
                  <button onClick={logout} className="flex w-full items-center gap-2 py-2 text-lg text-red-500 hover:text-red-600">
                    <span aria-hidden="true">↪</span>
                    সাইন আউট
                  </button>
                </div>
              </details>
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
