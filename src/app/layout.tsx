import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);
  return (
    <html lang="bn" data-theme="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-base-200">
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
