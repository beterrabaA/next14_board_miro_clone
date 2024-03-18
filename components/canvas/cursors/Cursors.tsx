"use client";

import { useOthersConnectionIds } from "@/liveblocks.config";

import { Cursor } from "@/components/canvas/cursors/Cursor";

export const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};
