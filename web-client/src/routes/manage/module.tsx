import { createFileRoute } from "@tanstack/react-router";
import { RouteGuard } from "../../components/RouteGuard";
import { MenuPart } from "../../pages/manage/module/menuPart";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RouteGuard location redirectTo="/unauthorized">
      <RouteContent />
    </RouteGuard>
  );
}

function RouteContent() {
  return <MenuPart />;
}
