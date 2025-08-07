import { Button, Space, Table, Toast } from "@douyinfe/semi-ui";
import {
  createMenu,
  deleteManyResource,
  deleteResource,
  getMenus,
  updateMenu,
  type FeatResource,
} from "@/services";
import { useEffect, useMemo, useState } from "react";
import { handleResp } from "@/utils/resp_flow";
import {
  featResourceToDataSource,
  type FeatResourceTableData,
} from "@/utils/feat_to_data_source";
import type {
  ColumnProps,
  ColumnRender,
  RowSelectionOnSelect,
} from "@douyinfe/semi-ui/lib/es/table";
import { SemiIcon } from "@/components/SemiIcon";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import type { DialogMode } from "./types";
import { IconSelect } from "@/components/IconSelect";
import { MenuEditor } from "./menuEditor";

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
          <IconSelect showClear />
          <Button
            theme="solid"
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
            添加
          </Button>
          <DeleteButton
            title="是否删除选定菜单？"
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
            onDoubleClickRow={(row) => {
              setDouble(row);
            }}
            actionRender={(_t, record) => {
              const row = record as FeatResourceTableData;

              return (
                <Space>
                  <Button
                    theme="solid"
                    onClick={() => openDialog(record, "edit")}
                  >
                    编辑
                  </Button>
                  <DeleteButton
                    position="bottomRight"
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
      <MenuEditor
        visible={dialogVisible}
        menu={editMenu}
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

function MenuDataTable({
  menus,
  loading,
  onDoubleClickRow,
  onSelect,
  actionRender,
}: {
  menus: FeatResource[] | undefined;
  loading?: boolean;
  onDoubleClickRow?: (row: FeatResource) => void;
  onSelect?: RowSelectionOnSelect<FeatResourceTableData>;
  actionRender?: ColumnRender<any>;
}) {
  const tableData = useMemo(() => featResourceToDataSource(menus), [menus]);

  const columns: ColumnProps[] = [
    { title: "Id", dataIndex: "id" },
    {
      title: "名称",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <Space>
            <SemiIcon name={record.icon} />
            {text}
          </Space>
        );
      },
    },
    { title: "描述", dataIndex: "description" },
    { title: "地址", dataIndex: "url" },
    {
      title: "操作",
      fixed: true,
      render: actionRender,
    },
  ];
  if (!actionRender) {
    columns.pop();
  }

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      loading={loading}
      pagination={false}
      defaultExpandedRowKeys={[1]}
      sticky
      bordered
      resizable
      scroll={{ x: 500, y: 500 }}
      style={{ height: 600 }}
      rowSelection={{
        fixed: true,
        onSelect: onSelect,
      }}
      onRow={(record) => {
        const row = record as FeatResource;
        return {
          onDoubleClick: () => {
            if (onDoubleClickRow) onDoubleClickRow(row);
          },
        };
      }}
    ></Table>
  );
}
