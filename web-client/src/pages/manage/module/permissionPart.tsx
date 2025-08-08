import {
  createPermission,
  deleteManyResource,
  deleteResource,
  getMenuPermissions,
  updatePermission,
  type FeatResource,
} from "@/services";
import { PermissionTable } from "./permissionTable";
import { Button, Space, Toast, Tooltip, Typography } from "@douyinfe/semi-ui";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import Icon, {
  IconDeleteStroked,
  IconEdit,
  IconPlus,
} from "@douyinfe/semi-icons";
import { FeatResourceEditor } from "./featResourceEditor";
import { useEffect, useState, type CSSProperties } from "react";
import {
  PermissionAdd,
  PermissionDelete,
  PermissionEdit,
  type DialogMode,
} from "./types";
import { DataTable, type PaginationData } from "@/components/DataTable";
import { handleResp } from "@/utils/resp_flow";
import {
  featResourceToDataSource,
  type FeatResourceTableData,
} from "@/utils/feat_to_data_source";
import { PermissionButton } from "@/components/PermissionButton";
import type { ColumnRender } from "@douyinfe/semi-ui/lib/es/table";
import { useAuth } from "@/hooks/useAuth";

export interface PermissionPartProps {
  parent?: FeatResource;
  className?: string;
  style?: CSSProperties;
}

export interface PageInfo {
  total?: number;
  page?: number;
  pageSize: number;
}

export function CurrentMenu({ menu }: { menu?: FeatResource }) {
  return (
    <Tooltip content="双击上方菜单条目查看">
      <span>
        当前菜单项：{menu?.description ?? menu?.name} - {menu?.id}
      </span>
    </Tooltip>
  );
}

export function PermissionPart(props: PermissionPartProps) {
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [dialogVisible, setDialogVisiable] = useState(false);
  const [selectedRows, setSelectedRows] = useState(
    undefined as FeatResource[] | undefined
  );
  const [editFeat, setEditFeat] = useState(
    undefined as FeatResource | undefined
  );
  const [refreshTable, setRefreshTable] = useState(false);

  const actionRender: ColumnRender<FeatResourceTableData> | undefined =
    !useAuth({ permissions: [PermissionEdit, PermissionDelete] })
      ? undefined
      : (_text, record) => {
          return (
            <Space>
              <PermissionButton
                permissions={[PermissionEdit]}
                icon={<IconEdit />}
                theme="borderless"
                size="small"
                onClick={() => {
                  setEditFeat(record);
                  showDialog("edit");
                }}
              >
                编辑
              </PermissionButton>
              <DeleteButton
                permissions={[PermissionDelete]}
                position="bottomRight"
                icon={<IconDeleteStroked />}
                theme="borderless"
                size="small"
                onConfirm={() => {
                  handleResp(deleteResource(record.id), {
                    handleOk: () => {
                      Toast.success("删除成功");
                      setSelectedRows(undefined);
                      setRefreshTable(!refreshTable);
                    },
                  });
                }}
              ></DeleteButton>
            </Space>
          );
        };

  function showDialog(mode: DialogMode) {
    setDialogMode(mode);
    setDialogVisiable(true);
  }

  useEffect(() => {
    setSelectedRows(undefined);
  }, [props.parent]);

  return (
    <>
      <div
        className={`w-full h-full flex flex-col ${props.className ?? ""}`}
        style={props.style}
      >
        <Space className="m-y-2">
          <PermissionButton
            permissions={[PermissionAdd]}
            icon={<IconPlus />}
            theme="solid"
            onClick={() => {
              setEditFeat(undefined);
              showDialog("add");
            }}
            disabled={props.parent == undefined}
          >
            添加许可
          </PermissionButton>
          <DeleteButton
            permissions={[PermissionDelete]}
            icon={<IconDeleteStroked />}
            disabled={selectedRows == undefined || selectedRows.length == 0}
            onConfirm={() => {
              if (selectedRows) {
                handleResp(deleteManyResource(selectedRows.map((r) => r.id)), {
                  handleOk: (count) => {
                    Toast.success(`成功删除 ${count} 个菜单项`);
                    setSelectedRows(undefined);
                    setRefreshTable(!refreshTable);
                  },
                });
              }
            }}
          >
            删除选中许可
          </DeleteButton>
          <CurrentMenu menu={props.parent} />
        </Space>
        <PermissionTable
          parentId={props.parent?.id}
          refresh={refreshTable}
          actionRender={actionRender}
          onSelect={(_row, _selected, selectedRows) => {
            setSelectedRows(selectedRows);
          }}
          onSelectAll={(_selected, selectedRows) => {
            setSelectedRows(selectedRows);
          }}
        />
      </div>
      <FeatResourceEditor
        from="permission"
        mode={dialogMode}
        visible={dialogVisible}
        feat={editFeat}
        parentId={props.parent?.id}
        onSubmit={(feat) => {
          if (dialogMode == "add") {
            handleResp(createPermission(feat), {
              handleOk: (data) => {
                Toast.success("添加成功");
                setRefreshTable(!refreshTable);
                setDialogVisiable(false);
              },
            });
          } else {
            handleResp(updatePermission(feat), {
              handleOk() {
                Toast.success("修改成功");
                setRefreshTable(!refreshTable);
                setDialogVisiable(false);
              },
            });
          }
        }}
        onCancel={() => setDialogVisiable(false)}
      />
    </>
  );
}
