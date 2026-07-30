import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <>Nirmi App</>;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
