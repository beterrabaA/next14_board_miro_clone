"use client";

import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";

import { MoreHorizontal } from "lucide-react";

import { Overlay } from "./Overlay";
import { Footer } from "./Footer";

import { Actions } from "@/components/Actions";
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

  const { mutate: onFavorite, loading: loadingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnFavorite, loading: loadingUnFavorite } = useApiMutation(
    api.board.unFavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnFavorite({ id: board._id }).catch((e) => toast.error(e.message));
    } else {
      onFavorite({ id: board._id, orgId: board.orgId }).catch((e) =>
        toast.error(e.message)
      );
    }
  };
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
          <Actions id={board._id} title={board.title} side="right">
            <button
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
              type="button"
            >
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={loadingFavorite || loadingUnFavorite}
          isFavorite={isFavorite}
          onClick={() => toggleFavorite()}
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
