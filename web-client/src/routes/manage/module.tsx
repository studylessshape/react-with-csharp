import { createFileRoute } from "@tanstack/react-router";
import { canAccessPage } from "../../utils/auth_router";
import {
  Button,
  Form,
  Modal,
  Space,
  Toast,
  Tree,
  Typography,
} from "@douyinfe/semi-ui";
import { getMenus, type FeatResource } from "../../services";
import { featResourceToTreeData, filterNode } from "../../utils/feats_to_tree";
import { useState } from "react";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    canAccessPage(location, context.menus, "/");
  },
  loader: async () => {
    var response = await getMenus();
    var menus: FeatResource[] | undefined = undefined;
    if (response.success && response.data) {
      menus = response.data;
    } else {
      Toast.error({
        content: `${response.code}: ${response.message ?? "获取菜单资源失败"}`,
        theme: "light",
      });
    }
    return menus;
  },
});

type DialogMode = "add" | "edit";
type DataFrom = "menu" | "permission";

function MenuEditor({
  menu,
  mode,
  allMenus,
}: {
  menu?: FeatResource;
  mode: DialogMode;
  allMenus: TreeNodeData[];
}) {
  return (
    <Form
      labelPosition="left"
      initValues={
        mode == "add"
          ? { parentId: menu?.id.toString(), order: 0 }
          : { ...menu, parentId: menu?.parentId?.toString() }
      }
    >
      <Form.Slot label="Id">
        <Typography.Text className="h-full flex items-center">
          {mode == "add" ? undefined : menu?.id}
        </Typography.Text>
      </Form.Slot>
      <Form.Input label="代号" field="name"></Form.Input>
      <Form.Input label="描述" field="description"></Form.Input>
      <Form.Input label="地址" field="url"></Form.Input>
      <Form.InputNumber label="排序" field="order"></Form.InputNumber>
      <Form.TreeSelect
        label="父级"
        field="parentId"
        disableStrictly
        treeData={
          mode == "add"
            ? allMenus
            : filterNode(allMenus, (data) => data["data"]["id"] != menu?.id)
        }
        expandAll
      ></Form.TreeSelect>
    </Form>
  );
}

function RouteComponent() {
  const menus = Route.useLoaderData();
  const [dialogTitle, setDialogTitle] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(
    undefined as FeatResource | undefined,
  );
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [dialogDataFrom, setDialogDataFrom] = useState("menu" as DataFrom);
  const [dialogVisible, setDialogVisiable] = useState(false);

  const treeData = featResourceToTreeData(menus);

  function showDialog(dataFrom: DataFrom, mode: DialogMode) {
    var newTitle = "";
    if (mode == "add") {
      newTitle = "添加 - ";
    } else {
      newTitle = "编辑 - ";
    }

    if (dataFrom == "menu") {
      newTitle += "菜单";
    } else {
      newTitle += "许可";
    }

    setDialogTitle(newTitle);
    setDialogDataFrom(dataFrom);
    setDialogMode(mode);
    setDialogVisiable(true);
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space>
          <Button
            theme="solid"
            disabled={selectedMenu == undefined}
            onClick={() => showDialog("menu", "add")}
          >
            添加
          </Button>
          <Button
            disabled={selectedMenu == undefined}
            onClick={() => showDialog("menu", "edit")}
          >
            编辑
          </Button>
        </Space>
        <div className="overflow-auto flex-1">
          <Tree
            showLine
            expandAll
            className="overflow-auto"
            treeData={treeData}
            onSelect={(
              _selectedKey: string,
              selected: boolean,
              selectedNode,
            ) => {
              if (selected) {
                setSelectedMenu(selectedNode["data"]);
              }
            }}
          ></Tree>
        </div>
      </div>
      <Modal
        title={dialogTitle}
        visible={dialogVisible}
        onCancel={() => setDialogVisiable(false)}
      >
        {dialogDataFrom == "menu" ? (
          <MenuEditor
            menu={selectedMenu}
            mode={dialogMode}
            allMenus={treeData}
          ></MenuEditor>
        ) : undefined}
      </Modal>
    </>
  );
}
