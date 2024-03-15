"use client";

import { Info } from "@/components/canvas/Info";
import { Participant } from "@/components/canvas/Participant";
import { Toolbar } from "@/components/canvas/ToolBar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participant />
      <Toolbar />
    </main>
  );
};
