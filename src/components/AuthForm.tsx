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
    if (signup && !name) return toast.error("নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = signup
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "কিছু ভুল হয়েছে");
    if (signup) { toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন"); router.push("/signin"); }
    else { toast.success("সফলভাবে সাইন ইন হয়েছে"); router.push(next); router.refresh(); }
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: next });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">{signup ? "নতুন অ্যাকাউন্ট খুলুন" : "সাইন ইন করুন"}</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          {signup && <input name="name" placeholder="নাম" className="input input-bordered w-full" />}
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
          <button disabled={loading} className="btn btn-success text-white w-full">
            {loading ? <span className="loading loading-spinner" /> : signup ? "রেজিস্টার" : "লগইন"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => social("google")} className="btn btn-outline">Google</button>
          <button onClick={() => social("github")} className="btn btn-outline">GitHub</button>
        </div>
        <p className="text-sm text-center mt-4">
          {signup ? "আগে থেকেই অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link href={signup ? "/signin" : "/signup"} className="link link-success font-semibold">{signup ? "লগইন" : "রেজিস্টার"}</Link>
        </p>
      </div>
    </div>
  );
}
