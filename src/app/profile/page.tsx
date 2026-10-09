import Link from "next/link";
import { requireSession } from "@/lib/session";

export default async function Profile() {
  const { user } = await requireSession("/profile");
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow p-6 items-center text-center gap-2">
        {user.image ? <img src={user.image} alt="" className="w-24 h-24 rounded-full" /> : <div className="text-6xl">👤</div>}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
        <Link href="/profile/update" className="btn btn-success text-white mt-3">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}
