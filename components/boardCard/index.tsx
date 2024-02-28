"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

import { Overlay } from "./Overlay";
import { Footer } from "./Footer";

import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
  _id: string;
  _creationTime: number;
  orgId: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
}

export const BoardCard = ({
  board,
  isFavorite,
}: {
  board: BoardCardProps;
  isFavorite: boolean;
}) => {
  const { userId } = useAuth();

  const authorLabel = userId === board.authorId ? "You" : board.authorName;
  const createdAtLabel = formatDistanceToNow(board._creationTime, {
    addSuffix: true,
  });
  return (
    <Link href={`/board/${board._id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            alt="doodle"
            className="object-fit"
            fill
            src={board.imageUrl}
          />
          <Overlay />
        </div>
        <Footer
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={false}
          isFavorite={isFavorite}
          onClick={() => {}}
          title={board.title}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
