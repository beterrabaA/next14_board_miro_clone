"use client";

import { Info } from "@/components/boardId/Info";
import { Participant } from "@/components/boardId/Participant";
import { Toolbar } from "@/components/boardId/ToolBar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participant />
      <Toolbar />
    </main>
  );
};
