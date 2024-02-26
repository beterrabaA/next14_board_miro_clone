"use client";

import Image from "next/image";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/Hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative">
      <Hint align="start" label={name} side="right" sideOffset={18}>
        <Image
          alt={name}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
          fill
          onClick={() => handleClick()}
          src={imageUrl}
        />
      </Hint>
    </div>
  );
};
