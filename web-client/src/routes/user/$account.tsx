import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$account")({
  component: RouteComponent,
});

function RouteComponent() {
  const { account } = useParams({
    from: "/user/$account",
  });
  return <div>Hello "{account}"!</div>;
}
