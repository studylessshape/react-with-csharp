import { DataTable } from "@/components/DataTable";
import { useAuth } from "@/hooks/useAuth";
import { UserAdd, UserDelete, UserEdit } from "@/permissions";
import type { UserDetails } from "@/services";
import { changeUserState, getUsers } from "@/services/user";
import { Space, Toast, Typography } from "@douyinfe/semi-ui";
import type { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useMemo, useState, type CSSProperties } from "react";
import { UserStatusSwitch } from "./userStatusSwitch";
import { PermissionButton } from "@/components/PermissionButton";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { IconDeleteStroked, IconEdit, IconUserAdd } from "@douyinfe/semi-icons";
import { handleResp } from "@/utils/respFlow";

export interface UserTableProps {
  refresh?: any;
  className?: string;
  style?: CSSProperties;
  onAddClick?: () => any | Promise<any>;
  onEditClick?: (user: UserDetails) => any | Promise<any>;
  onDeleteSingleClick?: (user: UserDetails) => any | Promise<any>;
  onDeleteMultiClick?: (users: UserDetails[]) => any | Promise<any>;
}

export function UserTable(props: UserTableProps) {
  const hasEditOrDeletePermissions = useAuth({
    permissions: [UserEdit, UserDelete],
  });
  const [selectedUsers, setSelectedUsers] = useState<UserDetails[] | undefined>(
    undefined
  );

  const columns: ColumnProps<UserDetails>[] = useMemo(() => {
    var cols: ColumnProps<UserDetails>[] = [
      { title: "账户", dataIndex: "account" },
      { title: "用户名", dataIndex: "name" },
      { title: "Code", dataIndex: "code" },
      { title: "备注", dataIndex: "remark" },
      {
        title: "状态",
        dataIndex: "status",
        render: (_text, record) => {
          return (
            <UserStatusSwitch
              account={record.account}
              status={record.status}
              onSwitch={async (account, enable) => {
                return await handleResp(changeUserState(account, enable), {
                  handleOk: () => Toast.success("状态修改成功"),
                });
              }}
            ></UserStatusSwitch>
          );
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
              <PermissionButton
                theme="borderless"
                icon={<IconEdit />}
                onClick={() => {
                  if (props.onEditClick) {
                    props.onEditClick(record);
                  }
                }}
              >
                编辑
              </PermissionButton>
              <DeleteButton
                theme="borderless"
                icon={<IconDeleteStroked />}
                position="bottomRight"
                onConfirm={() => {
                  if (props.onDeleteSingleClick) {
                    props.onDeleteSingleClick(record);
                  }
                }}
              ></DeleteButton>
            </Space>
          );
        },
      });
    }
    return cols;
  }, [hasEditOrDeletePermissions]);
  return (
    <div
      className={`flex flex-col ${props.className ?? ""}`}
      style={props.style}
    >
      <DataTable
        loadData={async (pageData) => {
          var response = await getUsers(
            pageData.currentPage,
            pageData.pageSize
          );
          if (response.success) {
            return response.data;
          }
          Toast.error("获取用户列表失败");
          return undefined;
        }}
        total={(data) => data.total}
        dataToTableData={(data) =>
          data.content.map((d) => ({ ...d, key: d.id }))
        }
        changing={props.refresh}
        columns={columns}
        full={{ heightReduce: 170 }}
        className="h-full"
        title={
          <div className="flex justify-between">
            <Space>
              <Typography.Title heading={4}>用户管理</Typography.Title>
              <PermissionButton
                theme="solid"
                permissions={[UserAdd]}
                icon={<IconUserAdd />}
                onClick={() => {
                  if (props.onAddClick) {
                    props.onAddClick();
                  }
                }}
              >
                添加用户
              </PermissionButton>
              <DeleteButton
                icon={<IconDeleteStroked />}
                onConfirm={() => {
                  if (
                    props.onDeleteMultiClick &&
                    selectedUsers &&
                    selectedUsers.length > 0
                  ) {
                    props.onDeleteMultiClick(selectedUsers);
                  }
                }}
                disabled={
                  selectedUsers == undefined || selectedUsers.length == 0
                }
              >
                删除选中用户
              </DeleteButton>
            </Space>
          </div>
        }
        rowSelection={{
          fixed: true,
          onSelect: (_record, selected, selectedRows) => {
            setSelectedUsers(selectedRows);
          },
          onSelectAll: (selected, selectedRows) => {
            setSelectedUsers(selectedRows);
          },
        }}
      ></DataTable>
    </div>
  );
}
