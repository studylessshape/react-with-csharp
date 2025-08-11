import { DataTable, type PaginationData } from "@/components/DataTable";
import { RouteGuard } from "@/components/RouteGuard";
import { getRoles } from "@/services/role";
import { Toast } from "@douyinfe/semi-ui";
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

async function loadRoles(page?: PaginationData) {
  const response = await getRoles(page?.currentPage ?? 1, page?.pageSize ?? 10);
  if (response.success) {
    return response.data;
  }
  Toast.error(response.message ?? "获取角色失败");
  return undefined;
}

function RouteContent() {
  const columns: ColumnProps[] = [
    { title: "Id", dataIndex: "id" },
    { title: "角色名", dataIndex: "claimValue" },
  ];
  return (
    <div>
      <DataTable
        title="角色"
        loadData={loadRoles}
        dataToTableData={(data) =>
          data.content.map((role) => ({ ...role, key: role.id }))
        }
        total={(data) => data.total}
        columns={columns}
      ></DataTable>
    </div>
  );
}
