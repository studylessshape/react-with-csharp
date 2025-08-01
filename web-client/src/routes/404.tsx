import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "../components/NotFoundPage";

export const Route = createFileRoute("/404")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound data={undefined} />;
}
