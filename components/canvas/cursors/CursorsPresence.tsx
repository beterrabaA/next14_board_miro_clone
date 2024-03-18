"use client";

import { memo } from "react";

import { Cursors } from "@/components/canvas/cursors/Cursors";
import { Drafts } from "@/components/canvas/cursors/Drafts";

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
