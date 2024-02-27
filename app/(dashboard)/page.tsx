"use client";

import { useOrganization } from "@clerk/nextjs";

import { EmptyOrg } from "@/components/EmptyOrg";
import { BoardList } from "@/components/BoardList";

interface DashboardProp {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function Home({ searchParams }: DashboardProp) {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}
