"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: value.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <form onSubmit={submit} className="card bg-white shadow p-6 space-y-3">
        <h1 className="text-2xl font-bold text-center">তথ্য আপডেট করুন</h1>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="নাম" className="input input-bordered w-full" />
        <button disabled={loading} className="btn btn-success text-white w-full">
          {loading ? <span className="loading loading-spinner" /> : "Update Information"}
        </button>
      </form>
    </div>
  );
}
