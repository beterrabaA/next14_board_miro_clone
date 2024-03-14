import { Canvas } from "@/components/boardId/Canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return (
    <div>
      <Canvas boardId={params.boardId} />
    </div>
  );
};

export default BoardIdPage;
