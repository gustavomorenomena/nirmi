import { getBoard } from "@/api/boards";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId")({
  loader: async ({ params: { boardId } }) => {
    const { board } = await getBoard(boardId);
    if (!board) {
      throw notFound();
    }
    return { board };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { board } = Route.useLoaderData();

  return (
    <>
      <div>Hello "/boards/$boardId"!</div>
      <div>{JSON.stringify(board)}</div>
    </>
  );
}
