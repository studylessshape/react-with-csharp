import { DataTable } from "@/components/DataTable";
import { useAuth } from "@/hooks/useAuth";
import { UserDelete, UserEdit } from "@/permissions";
import type { UserDetails } from "@/services";
import { getUsers } from "@/services/user";
import { Space, Toast } from "@douyinfe/semi-ui";
import type { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useMemo } from "react";
import { UserStatusSwitch } from "./userStatusSwitch";
import { PermissionButton } from "@/components/PermissionButton";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { IconDeleteStroked } from "@douyinfe/semi-icons";

export interface UserTableProps {
  refresh?: any;
}

export function UserTable(props: UserTableProps) {
  const hasEditOrDeletePermissions = useAuth({
    permissions: [UserEdit, UserDelete],
  });
  const columns: ColumnProps[] = useMemo(() => {
    var cols: ColumnProps[] = [
      { title: "账户", dataIndex: "account" },
      { title: "用户名", dataIndex: "name" },
      { title: "Code", dataIndex: "code" },
      { title: "备注", dataIndex: "remark" },
      {
        title: "状态",
        dataIndex: "status",
        render: (_text, record) => {
          const user = record as UserDetails;
          return <UserStatusSwitch status={user.status}></UserStatusSwitch>;
        },
      },
    ];

    if (hasEditOrDeletePermissions) {
      cols.push({
        title: "操作",
        render: (_text, record) => {
          const user = record as UserDetails;
          return (
            <Space>
              <PermissionButton>编辑</PermissionButton>
              <DeleteButton icon={<IconDeleteStroked />}></DeleteButton>
            </Space>
          );
        },
      });
    }
    return cols;
  }, [hasEditOrDeletePermissions]);
  return (
    <DataTable
      loadData={async (pageData) => {
        var response = await getUsers(pageData.currentPage, pageData.pageSize);
        if (response.success) {
          return response.data;
        }
        Toast.error("获取用户列表失败");
        return undefined;
      }}
      total={(data) => data.total}
      dataToTableData={(data) => data.content.map((d) => ({ ...d, key: d.id }))}
      columns={columns}
    ></DataTable>
  );
}
