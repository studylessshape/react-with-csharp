import { DataTable } from "@/components/DataTable";
import { RouteGuard } from "@/components/RouteGuard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/manage/role")({
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
  return <div>{/*<DataTable></DataTable>*/}</div>;
}
