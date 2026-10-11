"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";
  const [loading, setLoading] = useState(false);
  const signup = mode === "signup";

  useEffect(() => {
    if (sp.get("reason") === "protected") toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, [sp]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));
    const confirmPassword = String(f.get("confirmPassword") || "");
    if (signup && !name) return toast.error("নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (signup && password !== confirmPassword) return toast.error("পাসওয়ার্ড মিলছে না");
    setLoading(true);
    try {
      const { error } = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (error) return toast.error(error.message || "কিছু ভুল হয়েছে");
      if (signup) { toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন"); router.push("/signin"); }
      else { toast.success("সফলভাবে সাইন ইন হয়েছে"); router.push(next); router.refresh(); }
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ করা যায়নি। পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: next });
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-8 sm:py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {signup ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </div>
      <div className="card mt-5 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={onSubmit} className="space-y-2">
          {signup && (
            <label className="block text-sm font-medium">
              নাম
              <input name="name" placeholder="যেমন: রহিম উদ্দিন" className="input input-bordered input-sm mt-0.5 w-full font-normal" />
            </label>
          )}
          <label className="block text-sm font-medium">
            ইমেইল
            <input name="email" type="email" placeholder="you@example.com" className="input input-bordered input-sm mt-0.5 w-full font-normal" />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered input-sm mt-0.5 w-full font-normal" />
          </label>
          {signup && (
            <label className="block text-sm font-medium">
              পাসওয়ার্ড নিশ্চিত করুন
              <input name="confirmPassword" type="password" placeholder="আবার লিখুন" className="input input-bordered input-sm mt-0.5 w-full font-normal" />
            </label>
          )}
          <button disabled={loading} className="btn btn-sm btn-success text-white w-full">
            {loading ? <span className="loading loading-spinner" /> : signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </button>
        </form>
        <div className="divider my-3">অথবা</div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => social("google")} className="btn btn-sm btn-outline h-auto min-h-9 gap-2 whitespace-normal px-2 py-1 text-xs leading-tight">
            <span aria-hidden="true" className="text-base font-bold text-[#4285f4]">G</span>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          <button type="button" onClick={() => social("github")} className="btn btn-sm btn-outline h-auto min-h-9 gap-2 whitespace-normal px-2 py-1 text-xs leading-tight">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          {signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link href={signup ? "/signin" : "/signup"} className="link link-success font-semibold">{signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link>
        </p>
      </div>
      <div className="mt-5 text-center">
        <Link href="/" className="text-sm text-gray-500 underline underline-offset-2 hover:text-green-700">← হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
}
