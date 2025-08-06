import { createFileRoute, useLocation } from "@tanstack/react-router";
import {
  Avatar,
  Button,
  Form,
  Popconfirm,
  Space,
  Table,
  Toast,
  Tree,
  Typography,
} from "@douyinfe/semi-ui";
import {
  createMenu,
  deleteResource,
  getMenus,
  updateMenu,
  type FeatResource,
  type FeatResourceDetail,
} from "../../services";
import { featResourceToTreeData, filterNode } from "../../utils/feats_to_tree";
import { useEffect, useMemo, useState } from "react";
import { FormModal } from "../../components/FormModal";
import { handleResp } from "../../utils/resp_flow";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { featResourceToDataSource } from "../../utils/feat_to_data_source";
import { useMenuState, useUserState } from "../../stores";
import { useAuth } from "../../hooks/useAuth";
import type { ColumnProps, TableProps } from "@douyinfe/semi-ui/lib/es/table";
import { SemiIcon } from "../../components/SemiIcon";
import { RouteGuard } from "../../components/RouteGuard";

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
  const [menus, setMenus] = useState(undefined as FeatResource[] | undefined);
  const [selectedMenu, setSelectedMenu] = useState(
    undefined as FeatResource | undefined
  );
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [menuDialogVisible, setMenuDialogVisiable] = useState(false);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space></Space>
        <div className="overflow-auto flex-1 flex">
          <MenuDataTable />
        </div>
      </div>
      {/* <MenuEditor
        menu={selectedMenu}
        mode={dialogMode}
        onSubmit={(value) => {
          if (dialogMode == "add") {
            submitAdd(value);
          } else {
            submitEdit(value);
          }
        }}
        treeData={treeData}
        visible={menuDialogVisible}
        onCancel={() => setMenuDialogVisiable(false)}
      ></MenuEditor> */}
    </>
  );
}

function MenuDataTable() {
  const [menus, setMenus] = useState(undefined as FeatResource[] | undefined);
  const [isLoading, setIsLoading] = useState(false);
  const tableData = useMemo(() => featResourceToDataSource(menus), [menus]);

  useEffect(() => {
    if (menus == undefined) {
      setIsLoading(true);
      handleResp(getMenus(), {
        handleOk(data) {
          setMenus(data);
        },
        defaultMessage: "获取菜单失败",
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [menus]);

  const columns: ColumnProps[] = [
    { title: "Id", dataIndex: "id" },
    {
      title: "名称",
      dataIndex: "name",
      render: (text, record) => {
        return (
          <div>
            <SemiIcon name={record.icon} />
            {text}
          </div>
        );
      },
    },
    { title: "描述", dataIndex: "description" },
    { title: "地址", dataIndex: "url" },
  ];
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      loading={isLoading}
      pagination={false}
      sticky
      scroll={{ x: 800, y: 500 }}
    ></Table>
  );
}

function MenuEditor({
  mode,
  menu,
  treeData,
  onSubmit,
  visible,
  onCancel,
}: {
  mode: DialogMode;
  menu: FeatResource | undefined;
  treeData: TreeNodeData[] | undefined;
  onSubmit: (values: FeatResource) => void;
  visible?: boolean;
  onCancel?: () => void;
}) {
  const title = `${mode == "add" ? "添加" : "编辑"} - 菜单`;
  const treeDataProps =
    treeData == undefined
      ? treeData
      : mode == "add"
        ? treeData
        : filterNode(treeData, (data) => data["data"]["id"] != menu?.id);
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
