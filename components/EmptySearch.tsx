import Image from "next/image";

interface EmptySearchProps {
  image: string;
  title: string;
  label: string;
}

export const EmptySearch = ({ image, title, label }: EmptySearchProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="empty-search" src={image} height={140} width={140} />
      <h2 className="text-2xl font-semibold mt-6">{title}</h2>
      <p className="text-muted-foreground text-sm mt-2">{label}</p>
    </div>
  );
};
