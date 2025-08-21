import { createFileRoute } from "@tanstack/react-router";
import { RouteGuard } from "@/components/RouteGuard";
import { UserTable } from "@/pages/manage/user/userTable";

export const Route = createFileRoute("/manage/user")({
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
  return (
    <UserTable
      className="p-2 h-[calc(100%-1rem)]"
    ></UserTable>
  );
}
