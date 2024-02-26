"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Poppins } from "next/font/google";

import { OrganizationSwitcher } from "@clerk/nextjs";

import { LayoutDashboard, Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <Button
        asChild
        size="lg"
        className="font-normal justify-start px-2 w-full"
        variant={favorites ? "ghost" : "secondary"}
      >
        <Link href="/">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Team boards
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="font-normal justify-start px-2 w-full"
        variant={!favorites ? "ghost" : "secondary"}
      >
        <Link href={{ pathname: "/", query: { favorites: true } }}>
          <Star className="h-4 w-4 mr-2" />
          Favorites boards
        </Link>
      </Button>
    </div>
  );
};

export default OrgSidebar;
