import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

const newsReader = Newsreader({ subsets: ["latin"], display: "swap" })


export const metadata: Metadata = {
  title: "Anagrams",
  description: "Words anagram game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={newsReader.className}>{children}</body>
      <Analytics />
      <Toaster />
    </html>
  );
}
