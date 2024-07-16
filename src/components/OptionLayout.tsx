"use client";
import Options from "@/components/options";
import { usePathname } from "next/navigation";

export default function OptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldShowOptions =
    pathname === "/" || pathname === "/trending" || pathname === "/watchlist";

  return (
    <div className="flex w-full flex-col items-center">
      {shouldShowOptions && <Options />}
      {children}
    </div>
  );
}
