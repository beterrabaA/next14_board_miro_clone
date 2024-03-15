"use client";

import Image from "next/image";
import Link from "next/link";

import { Menu } from "lucide-react";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { InfoSkeleton } from "@/components/skeletons/InfoSkeleton";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { TabSeparator } from "@/components/TabSeparator";
import { Hint } from "@/components/Hint";
import { Actions } from "@/components/Actions";

import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/hooks/useRenameModal";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface InfoPros {
  boardId: string;
}

export const Info = ({ boardId }: InfoPros) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) return <InfoSkeleton />;
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild className="px-2" variant="board">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          className=""
          onClick={() => onOpen(data._id, data.title)}
          variant="board"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};
