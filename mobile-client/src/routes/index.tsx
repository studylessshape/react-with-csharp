import { Layout } from "@/components/Layout";
import { About } from "@/pages/About";
import { Home } from "@/pages/Home";
import { User } from "@/pages/User";
import { createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
