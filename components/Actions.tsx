"use client";

import { ReactNode } from "react";

import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModal } from "@/hooks/useRenameModal";

import { Link2, Pencil } from "lucide-react";

import { ConfirmModal } from "@/components/ConfirmModal";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  children: ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  id,
  title,
  side,
  sideOffset,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, loading } = useApiMutation(api.board.remove);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Faild to copy"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Faild to delete"));
  };
  return (
    <div className="absolute z-50 top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
        >
          <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
            <Link2 className="h-4 w-4 mr-2" />
            Copy board link
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-3 cursor-pointer"
            onClick={() => onOpen(id, title)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete board?"
            description="This will delete the board and all of its contents."
            disabled={loading}
            onConfirm={onDelete}
          >
            <Button
              className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
              variant="ghost"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
