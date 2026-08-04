import { getBoard } from "@/api/boards";
import { Container } from "@/components/Container";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

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
    <Container className="my-4">
      <h1 className="text-center">
        <span className="text-xs text-gray-500">ANNONCES</span>
        <br />
        <span className="text-xl text-primary font-bold">
          {board.name.toUpperCase()}
        </span>
      </h1>
      <Outlet />
    </Container>
  );
}
