import { Button, Space, Toast } from "@douyinfe/semi-ui";
import {
  createMenu,
  deleteManyResource,
  deleteResource,
  getMenus,
  updateMenu,
  type FeatResource,
} from "@/services";
import { useEffect, useState } from "react";
import { handleResp } from "@/utils/respFlow";
import { type FeatResourceTableData } from "@/utils/featToDataSource";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import {
  PermissionAdd,
  PermissionDelete,
  PermissionEdit,
  type DialogMode,
} from "./types";
import { MenuDataTable } from "./menuTable";
import { IconDeleteStroked, IconEdit, IconPlus } from "@douyinfe/semi-icons";
import { FeatResourceEditor } from "./featResourceEditor";
import { PermissionButton } from "@/components/PermissionButton";
import { useAuth } from "@/hooks/useAuth";
import type { ColumnRender } from "@douyinfe/semi-ui/lib/es/table";

export function MenuPart({
  onDoubleClickRow,
}: {
  onDoubleClickRow?: (row: FeatResource | undefined) => void;
}) {
  const [menus, setMenus] = useState(undefined as FeatResource[] | undefined);
  const [editMenu, setEditMenu] = useState(
    undefined as FeatResource | undefined,
  );
  const [loading, setLoading] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState(
    undefined as FeatResource[] | undefined,
  );
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [dialogVisible, setDialogVisiable] = useState(false);
  const [doubleMenu, setDoubleMenu] = useState(
    undefined as FeatResource | undefined,
  );

  function setDouble(row: FeatResource | undefined) {
    setDoubleMenu(row);
    if (onDoubleClickRow) onDoubleClickRow(row);
  }

  function loadMenus() {
    setLoading(true);
    handleResp(getMenus(), {
      handleOk(data) {
        setMenus(data);
      },
      defaultMessage: "获取菜单失败",
    }).finally(() => {
      setLoading(false);
    });
  }

  function openDialog(menu: FeatResource | undefined, mode: DialogMode) {
    setEditMenu(menu);
    setDialogMode(mode);
    setDialogVisiable(true);
  }

  const actionRender: ColumnRender<FeatResourceTableData> | undefined =
    !useAuth({
      permissions: [PermissionEdit, PermissionDelete],
    })
      ? undefined
      : (_t, record) => {
          const row = record;

          return (
            <Space>
              <PermissionButton
                theme="borderless"
                permissions={[PermissionEdit]}
                size="small"
                icon={<IconEdit />}
                onClick={() => openDialog(record, "edit")}
              >
                编辑
              </PermissionButton>
              <DeleteButton
                position="bottomRight"
                theme="borderless"
                size="small"
                permissions={[PermissionDelete]}
                icon={<IconDeleteStroked />}
                onConfirm={() => {
                  handleResp(deleteResource(row.id), {
                    handleOk: () => {
                      Toast.success("删除成功！");
                      loadMenus();
                      if (doubleMenu && doubleMenu.id == row.id) {
                        setDouble(undefined);
                      }
                      if (selectedMenus?.some((f) => f.id == row.id) == true) {
                        setSelectedMenus(
                          selectedMenus.filter((f) => f.id != row.id),
                        );
                      }
                    },
                  });
                }}
              ></DeleteButton>
            </Space>
          );
        };

  useEffect(() => {
    if (menus == undefined) {
      loadMenus();
    }
  }, [menus]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space className="m-y-2">
          <PermissionButton
            permissions={[PermissionAdd]}
            theme="solid"
            icon={<IconPlus />}
            disabled={selectedMenus != undefined && selectedMenus.length > 1}
            onClick={() =>
              openDialog(
                selectedMenus == undefined || selectedMenus.length == 0
                  ? undefined
                  : selectedMenus[0],
                "add",
              )
            }
          >
            添加菜单
          </PermissionButton>
          <DeleteButton
            title="是否删除选定菜单？"
            permissions={[PermissionDelete]}
            icon={<IconDeleteStroked />}
            children="删除选中菜单"
            disabled={selectedMenus == undefined || selectedMenus.length == 0}
            onConfirm={() => {
              if (selectedMenus) {
                handleResp(deleteManyResource(selectedMenus.map((m) => m.id)), {
                  handleOk: (count) => {
                    Toast.success(`成功删除 ${count} 个菜单项`);
                    loadMenus();
                    if (
                      doubleMenu &&
                      selectedMenus.some((f) => f.id == doubleMenu.id)
                    ) {
                      setDouble(undefined);
                    }
                    setSelectedMenus(undefined);
                  },
                });
              }
            }}
          />
        </Space>
        <div className="overflow-auto flex-1 flex">
          <MenuDataTable
            menus={menus}
            loading={loading}
            onSelect={(_row, _selected, selectedRows) => {
              setSelectedMenus(selectedRows);
            }}
            onSelectAll={(_selected, selectedRows) => {
              setSelectedMenus(selectedRows);
            }}
            onDoubleClickRow={(row) => {
              setDouble(row);
            }}
            actionRender={actionRender}
          />
        </div>
      </div>
      <FeatResourceEditor
        visible={dialogVisible}
        feat={editMenu}
        from="menu"
        mode={dialogMode}
        datas={menus}
        onSubmit={(value) => {
          if (dialogMode == "add") {
            handleResp(createMenu(value), {
              handleOk: () => {
                Toast.success("添加成功");
                loadMenus();
                setDialogVisiable(false);
              },
            });
          } else {
            handleResp(updateMenu(value), {
              handleOk: () => {
                Toast.success("修改成功");
                loadMenus();
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
