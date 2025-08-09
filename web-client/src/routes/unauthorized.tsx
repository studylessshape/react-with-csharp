import { createFileRoute } from "@tanstack/react-router";
import { ErrorRoutePage } from "@/components/ErrorRoutePage";
import { UnauthorizedErrorName } from "@/components/ErrorRoutePage/UnauthorizedComponent";

export const Route = createFileRoute("/unauthorized")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ErrorRoutePage
      error={{ name: UnauthorizedErrorName, message: "无权限访问" }}
      reset={() => {}}
      className="w-full h-full"
    ></ErrorRoutePage>
  );
}
