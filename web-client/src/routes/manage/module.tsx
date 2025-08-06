import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Form,
  Space,
  Table,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import {
  createMenu,
  deleteManyResource,
  deleteResource,
  getMenus,
  updateMenu,
  type FeatResource,
  type FeatResourceDetail,
} from "../../services";
import { featResourceToTreeData } from "../../utils/feats_to_tree";
import { useEffect, useMemo, useState } from "react";
import { FormModal } from "../../components/FormModal";
import { handleResp } from "../../utils/resp_flow";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import {
  featResourceToDataSource,
  type FeatResourceTableData,
} from "../../utils/feat_to_data_source";
import type {
  ColumnProps,
  ColumnRender,
  RowSelectionOnSelect,
} from "@douyinfe/semi-ui/lib/es/table";
import { SemiIcon } from "../../components/SemiIcon";
import { RouteGuard } from "../../components/RouteGuard";
import { DeleteButton } from "../../components/PermissionButton/DeleteButton";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
});

type DialogMode = "add" | "edit";
type DataFrom = "menu" | "permission";

function RouteComponent() {
  return (
    <RouteGuard location redirectTo="/unauthorized">
      <RouteContent />
    </RouteGuard>
  );
}

function RouteContent() {
  return <MenuPart />;
}

function MenuPart({
  onDoubleClickRow,
}: {
  onDoubleClickRow?: (row: FeatResource) => void;
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
            onDoubleClickRow={onDoubleClickRow}
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

function MenuEditor({
  mode,
  menu,
  datas,
  onSubmit,
  visible,
  onCancel,
}: {
  mode: DialogMode;
  menu: FeatResource | undefined;
  datas: FeatResource[] | undefined;
  onSubmit: (values: FeatResource) => void;
  visible?: boolean;
  onCancel?: () => void;
}) {
  const title = `${mode == "add" ? "添加" : "编辑"} - 菜单`;
  const treeDataProps: TreeNodeData[] | undefined = featResourceToTreeData(
    datas,
    mode == "add" ? undefined : (data) => data.id == menu?.id
  );

  return (
    <FormModal
      form={{
        labelPosition: "left",
        initValues:
          mode == "add"
            ? { parentId: menu?.id.toString(), order: 0 }
            : {
                ...menu,
                parentId: menu?.parentId?.toString(),
              },
        onSubmit: (values) => {
          const { parentId, ...valuesOther } = values;
          const detail = {
            parentId: parentId != undefined ? parseInt(parentId) : undefined,
            ...valuesOther,
          } as FeatResourceDetail;
          const value = { id: menu?.id, kind: 0, ...detail } as FeatResource;
          onSubmit(value);
        },
      }}
      modal={{
        title: title,
        onCancel: onCancel,
        visible: visible,
      }}
    >
      <Form.Slot label="Id">
        <Typography.Text className="h-full flex items-center">
          {mode == "add" ? undefined : menu?.id}
        </Typography.Text>
      </Form.Slot>
      <Form.Input
        label="代号"
        field="name"
        rules={[{ required: true, message: "代号不可为空" }]}
      ></Form.Input>
      <Form.Input label="描述" field="description"></Form.Input>
      <Form.Input label="地址" field="url"></Form.Input>
      <Form.InputNumber label="排序" field="order" required></Form.InputNumber>
      <Form.TreeSelect
        label="父级"
        field="parentId"
        disableStrictly
        treeData={treeDataProps}
      ></Form.TreeSelect>
    </FormModal>
  );
}
