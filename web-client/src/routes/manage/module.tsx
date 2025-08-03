import { createFileRoute } from "@tanstack/react-router";
import { canAccessPage } from "../../utils/auth_router";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    canAccessPage(location, context.menus, "/");
  },
});

function RouteComponent() {
  return <div>Hello "/manage/module"!</div>;
}
