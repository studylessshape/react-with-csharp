import { DataTable, type PaginationData } from "@/components/DataTable";
import { PermissionButton } from "@/components/PermissionButton";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { RouteGuard } from "@/components/RouteGuard";
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

async function loadRoles(page?: PaginationData) {
  const response = await getRoles(page?.currentPage ?? 1, page?.pageSize ?? 10);
  if (response.success) {
    return response.data;
  }
  Toast.error(response.message ?? "获取角色失败");
  return undefined;
}

function RouteContent() {
  const columns: ColumnProps<ClaimEntity>[] = [
    { title: "Id", dataIndex: "id" },
    { title: "角色名", dataIndex: "claimValue" },
    {
      title: "操作",
      fixed: true,
      render: (_text, record) => {
        return (
          <Space>
            <PermissionButton
              theme="borderless"
              style={{
                color: "green",
              }}
              icon={<IconLayers />}
              permissions={["role_manage:edit"]}
            >
              分配模块
            </PermissionButton>
            <DeleteButton
              theme="borderless"
              icon={<IconDeleteStroked />}
              permissions={["role_manage:delete"]}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <div className="h-full">
      <DataTable
        scroll={{ x: 500 }}
        tableClassName="h-full"
        title={
          <div className="flex justify-between">
            <Space>
              <Typography.Title heading={4}>角色列表</Typography.Title>
              <PermissionButton
                icon={<IconPlus />}
                theme="solid"
                permissions={["role_manage:add"]}
              >
                添加角色
              </PermissionButton>
              <DeleteButton
                icon={<IconDeleteStroked />}
                permissions={["role_manage:delete"]}
              >
                删除已选角色
              </DeleteButton>
            </Space>
          </div>
        }
        loadData={loadRoles}
        dataToTableData={(data) =>
          data.content.map((role) => ({ ...role, key: role.id }))
        }
        total={(data) => data.total}
        columns={columns}
        rowSelection={{ fixed: true }}
      ></DataTable>
    </div>
  );
}
