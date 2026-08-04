import { getPosts } from "@/api/posts";
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
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId/")({
  loader: async ({ params: { boardId } }) => {
    const { posts } = await getPosts(boardId);
    return { posts: posts || [] };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();
  const { boardId } = Route.useParams();

  return (
    <>
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
            <Link
              to="/boards/$boardId/create"
              params={{ boardId }}
              className={buttonVariants()}
            >
              Nouvelle Annonce
            </Link>
          </EmptyContent>
        </Empty>
      ) : null}
    </>
  );
}
