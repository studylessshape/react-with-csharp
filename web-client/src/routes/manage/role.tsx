import { DataTable, type PaginationData } from "@/components/DataTable";
import { PermissionButton } from "@/components/PermissionButton";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { RouteGuard } from "@/components/RouteGuard";
import { RoleTable } from "@/pages/manage/role/roleTable";
import type { ClaimEntity } from "@/services";
import { getRoles } from "@/services/role";
import { IconDeleteStroked, IconLayers, IconPlus } from "@douyinfe/semi-icons";
import { Space, Toast, Typography } from "@douyinfe/semi-ui";
import type { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
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
  return <RoleTable />;
}
