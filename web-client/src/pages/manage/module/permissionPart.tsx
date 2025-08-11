import {
  createPermission,
  deleteManyResource,
  deleteResource,
  updatePermission,
  type FeatResource,
} from "@/services";
import { PermissionTable } from "./permissionTable";
import {
  Highlight,
  Space,
  Toast,
  Tooltip,
  Typography,
} from "@douyinfe/semi-ui";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { IconDeleteStroked, IconEdit, IconPlus } from "@douyinfe/semi-icons";
import { FeatResourceEditor } from "./featResourceEditor";
import { useEffect, useState, type CSSProperties } from "react";
import { handleResp } from "@/utils/respFlow";
import { type FeatResourceTableData } from "@/utils/featToDataSource";
import { PermissionButton } from "@/components/PermissionButton";
import type { ColumnRender } from "@douyinfe/semi-ui/lib/es/table";
import { useAuth } from "@/hooks/useAuth";
import type { DialogMode } from "../interface";
import { ModuleAdd, ModuleDelete, ModuleEdit } from "@/permissions";

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
  const hightString =
    menu == undefined
      ? undefined
      : [`${menu.description ?? menu.name}(${menu.id})`];
  return (
    <Tooltip content="双击上方菜单条目查看">
      <Highlight
        sourceString={`当前菜单项: ${hightString == undefined ? "" : hightString[0]}`}
        searchWords={hightString}
        highlightStyle={{
          backgroundColor: "var(--semi-color-primary)",
          color: "rgba(var(--semi-white), 1)",
          padding: 1,
          borderRadius: 4,
        }}
      ></Highlight>
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
    !useAuth({ permissions: [ModuleEdit, ModuleDelete] })
      ? undefined
      : (_text, record) => {
          return (
            <Space>
              <PermissionButton
                permissions={[ModuleEdit]}
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
                permissions={[ModuleDelete]}
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
        <PermissionTable
          title={
            <Space>
              <Typography.Title heading={4}>许可列表</Typography.Title>
              <PermissionButton
                permissions={[ModuleAdd]}
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
                permissions={[ModuleDelete]}
                icon={<IconDeleteStroked />}
                disabled={selectedRows == undefined || selectedRows.length == 0}
                onConfirm={() => {
                  if (selectedRows) {
                    handleResp(
                      deleteManyResource(selectedRows.map((r) => r.id)),
                      {
                        handleOk: (count) => {
                          Toast.success(`成功删除 ${count} 个菜单项`);
                          setSelectedRows(undefined);
                          setRefreshTable(!refreshTable);
                        },
                      }
                    );
                  }
                }}
              >
                删除选中许可
              </DeleteButton>
              <CurrentMenu menu={props.parent} />
            </Space>
          }
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
