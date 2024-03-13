"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { BoardCard } from "@/components/boardCard";
import { EmptySearch } from "@/components/EmptySearch";
import { EmptyBoard } from "@/components/EmptyBoard";
import { NewBoardButton } from "@/components/NewBoardButton";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorites boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return (
      <EmptySearch
        image="/empty-search.svg"
        title="No results found!"
        label="Try searching for something else"
      />
    );
  }

  if (!data.length && query.favorites) {
    return (
      <EmptySearch
        image="/empty-favorites.svg"
        title="No favorite boards!"
        label="Try favoriting a board"
      />
    );
  }

  if (!data.length) {
    return <EmptyBoard />;
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorites boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
