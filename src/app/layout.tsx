import OptionLayout from "@/components/OptionLayout";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Head from "next/head";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main>
          <Link href="/" className="">
            <img
              src="/logo.svg"
              alt="logo"
              className="m-4 size-16 sm:size-20 md:size-24"
            />
          </Link>
          <OptionLayout>{children}</OptionLayout>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
