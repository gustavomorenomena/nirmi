import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <>Nouvelle annonce</>;
}
