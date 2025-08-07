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
import { handleResp } from "@/utils/resp_flow";
import { type FeatResourceTableData } from "@/utils/feat_to_data_source";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import type { DialogMode } from "./types";
import { MenuDataTable } from "./menuTable";
import { IconDeleteStroked, IconEdit, IconPlus } from "@douyinfe/semi-icons";
import { FeatResourceEditor } from "./featResourceEditor";

export function MenuPart({
  onDoubleClickRow,
}: {
  onDoubleClickRow?: (row: FeatResource | undefined) => void;
}) {
  const [menus, setMenus] = useState(undefined as FeatResource[] | undefined);
  const [editMenu, setEditMenu] = useState(
    undefined as FeatResource | undefined
  );
  const [loading, setLoading] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState(
    undefined as FeatResource[] | undefined
  );
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [dialogVisible, setDialogVisiable] = useState(false);
  const [doubleMenu, setDoubleMenu] = useState(
    undefined as FeatResource | undefined
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

  useEffect(() => {
    if (menus == undefined) {
      loadMenus();
    }
  }, [menus]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space>
          <Button
            theme="solid"
            icon={<IconPlus />}
            disabled={selectedMenus != undefined && selectedMenus.length > 1}
            onClick={() =>
              openDialog(
                selectedMenus == undefined || selectedMenus.length == 0
                  ? undefined
                  : selectedMenus[0],
                "add"
              )
            }
          >
            添加菜单
          </Button>
          <DeleteButton
            title="是否删除选定菜单？"
            icon={<IconDeleteStroked />}
            buttonChildren="删除选中菜单"
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
            actionRender={(_t, record) => {
              const row = record as FeatResourceTableData;

              return (
                <Space>
                  <Button
                    theme="solid"
                    icon={<IconEdit />}
                    onClick={() => openDialog(record, "edit")}
                  >
                    编辑
                  </Button>
                  <DeleteButton
                    position="bottomRight"
                    icon={<IconDeleteStroked />}
                    onConfirm={() => {
                      handleResp(deleteResource(row.id), {
                        handleOk: () => {
                          Toast.success("删除成功！");
                          loadMenus();
                          if (doubleMenu && doubleMenu.id == row.id) {
                            setDouble(undefined);
                          }
                          if (
                            selectedMenus?.some((f) => f.id == row.id) == true
                          ) {
                            setSelectedMenus(
                              selectedMenus.filter((f) => f.id != row.id)
                            );
                          }
                        },
                      });
                    }}
                  ></DeleteButton>
                </Space>
              );
            }}
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
