"use client";

import { EmptySearch } from "@/components/EmptySearch";
import { EmptyBoard } from "@/components/EmptyBoard";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = [];

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
  return <div>BoardList</div>;
};
