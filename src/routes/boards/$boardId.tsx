import { getBoard } from "@/api/boards";
import { getPosts } from "@/api/posts";
import { Container } from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileEmpty01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId")({
  loader: async ({ params: { boardId } }) => {
    const { board } = await getBoard(boardId);
    if (!board) {
      throw notFound();
    }
    const { posts } = await getPosts(boardId);
    return { board, posts: posts || [] };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { board, posts } = Route.useLoaderData();

  return (
    <Container className="my-4">
      <h1 className="text-center">
        <span className="text-xs text-gray-500">ANNONCES</span>
        <br />
        <span className="text-xl text-primary font-bold">
          {String(board.name).toUpperCase()}
        </span>
      </h1>
      {posts.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={FileEmpty01Icon} />
            </EmptyMedia>
            <EmptyTitle>Pas encore d'annonces</EmptyTitle>
            <EmptyDescription>
              Aucune annonce trouvé pour ce panneau d'affichage
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link to="/" className={buttonVariants()}>
              Nouvelle Annonce
            </Link>
          </EmptyContent>
        </Empty>
      ) : null}
    </Container>
  );
}
