import { DataTable, type PaginationData } from "@/components/DataTable";
import { PermissionButton } from "@/components/PermissionButton";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { useAuth } from "@/hooks/useAuth";
import type { ClaimEntity } from "@/services";
import { getRoles } from "@/services/role";
import {
  IconDeleteStroked,
  IconEdit,
  IconLayers,
  IconPlus,
} from "@douyinfe/semi-icons";
import { Space, Toast, Typography } from "@douyinfe/semi-ui";
import type { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useMemo, useState } from "react";

async function loadRoles(page?: PaginationData) {
  const response = await getRoles(page?.currentPage ?? 1, page?.pageSize ?? 10);
  if (response.success) {
    return response.data;
  }
  Toast.error(response.message ?? "获取角色失败");
  return undefined;
}

export interface RoleTableProps {
  assignModuleCallback?: (entity: ClaimEntity) => Promise<void> | void;
  createRoleCallback?: () => Promise<void> | void;
  editRoleCallback?: (entity: ClaimEntity) => Promise<void> | void;
  deleteRoleCallback?: (entity: ClaimEntity) => Promise<void> | void;
  deleteRolesCallback?: (entities: ClaimEntity[]) => Promise<void> | void;
  onRowSelected?: (entity?: ClaimEntity) => void;
  refresh?: any;
}

export function RoleTable(props: RoleTableProps) {
  const hasEditDeletePermission = useAuth({
    permissions: ["role_manage:edit", "role_manage:delete"],
    allPermission: true,
  });
  const columns: ColumnProps<ClaimEntity>[] = useMemo(() => {
    var cols: ColumnProps<ClaimEntity>[] = [
      { title: "Id", dataIndex: "id" },
      { title: "角色名", dataIndex: "claimValue" },
    ];
    if (hasEditDeletePermission) {
      cols.push({
        title: "操作",
        fixed: true,
        render: (_text, record) => {
          return (
            <Space>
              <PermissionButton
                theme="borderless"
                permissions={["role_manage:edit"]}
                icon={<IconEdit />}
              >
                编辑
              </PermissionButton>
              <PermissionButton
                theme="borderless"
                style={{
                  color: "green",
                }}
                icon={<IconLayers />}
                permissions={["role_manage:edit"]}
                onClick={() => {
                  if (props.assignModuleCallback) {
                    props.assignModuleCallback(record);
                  }
                }}
              >
                分配模块
              </PermissionButton>
              <DeleteButton
                theme="borderless"
                icon={<IconDeleteStroked />}
                position="bottomRight"
                permissions={["role_manage:delete"]}
                onConfirm={() => {
                  if (props.deleteRoleCallback) {
                    props.deleteRoleCallback(record);
                  }
                }}
              />
            </Space>
          );
        },
      });
    }
    return cols;
  }, [hasEditDeletePermission]);
  const [selectedRows, setSelectedRows] = useState(
    undefined as ClaimEntity[] | undefined
  );

  return (
    <div className="h-full flex flex-col">
      <DataTable
        className="h-full"
        scroll={{ x: 500, y: 590 }}
        changing={props.refresh}
        title={
          <div className="flex justify-between">
            <Space>
              <Typography.Title heading={4}>角色列表</Typography.Title>
              <PermissionButton
                icon={<IconPlus />}
                theme="solid"
                permissions={["role_manage:add"]}
                onClick={() => {
                  if (props.createRoleCallback) {
                    props.createRoleCallback();
                  }
                }}
              >
                添加角色
              </PermissionButton>
              <DeleteButton
                icon={<IconDeleteStroked />}
                permissions={["role_manage:delete"]}
                disabled={selectedRows == undefined || selectedRows.length == 0}
                onConfirm={() => {
                  if (
                    props.deleteRolesCallback &&
                    selectedRows &&
                    selectedRows.length > 0
                  ) {
                    props.deleteRolesCallback(selectedRows);
                  }
                }}
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
        rowSelection={{
          fixed: true,
          onSelect: (_record, selected, selectedRows) => {
            if (props.onRowSelected) {
              if (selected && selectedRows && selectedRows.length == 1) {
                props.onRowSelected(selectedRows[0]);
              } else {
                props.onRowSelected(undefined);
              }
            }
            setSelectedRows(selectedRows);
          },
          onSelectAll: (selected, selectedRows) => {
            if (props.onRowSelected) {
              if (selected && selectedRows && selectedRows.length == 1) {
                props.onRowSelected(selectedRows[0]);
              } else {
                props.onRowSelected(undefined);
              }
            }
            setSelectedRows(selectedRows);
          },
        }}
        popoverPosition="top"
      ></DataTable>
    </div>
  );
}
