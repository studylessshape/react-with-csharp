import { createFileRoute } from "@tanstack/react-router";
import { canAccessPage } from "../../utils/auth_router";
import {
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
import { useState } from "react";
import { FormModal } from "../../components/FormModal";
import { handleResp } from "../../utils/resp_flow";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";

export const Route = createFileRoute("/manage/module")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.user.hasRole("System")) {
      canAccessPage(location, context.menus, "/");
    }
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

function RouteComponent() {
  const loadMenus = Route.useLoaderData();
  const [menus, setMenus] = useState(loadMenus);
  const [selectedMenu, setSelectedMenu] = useState(
    undefined as FeatResource | undefined,
  );
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [menuDialogVisible, setMenuDialogVisiable] = useState(false);

  const treeData = featResourceToTreeData(menus);

  function showDialog(dataFrom: DataFrom, mode: DialogMode) {
    setDialogMode(mode);
    if (dataFrom == "menu") {
      setMenuDialogVisiable(true);
    }
  }

  function submitAdd(request: FeatResourceDetail) {
    handleResp(createMenu(request), {
      handleOk: (data) => {
        if (menus) {
          setMenus(menus.concat([data]));
        } else {
          setMenus([data]);
        }
        Toast.success({ content: "添加成功", theme: "light" });
        setMenuDialogVisiable(false);
      },
    });
  }

  function submitEdit(request: FeatResource) {
    handleResp(updateMenu(request), {
      handleOk: (_data) => {
        handleResp(getMenus(), {
          handleOk: (data) => {
            setMenus(data);
            if (selectedMenu) {
              setSelectedMenu(data.find((v) => v.id == selectedMenu.id));
            }
          },
        });
        Toast.success({ content: "修改成功", theme: "light" });
        setMenuDialogVisiable(false);
      },
    });
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space>
          <Button theme="solid" onClick={() => showDialog("menu", "add")}>
            添加
          </Button>
          <Button
            disabled={selectedMenu == undefined}
            onClick={() => showDialog("menu", "edit")}
          >
            编辑
          </Button>
          <Popconfirm
            title="是否确认删除？"
            content={`${selectedMenu?.name} - ${selectedMenu?.description} - ${selectedMenu?.url}`}
            onConfirm={() => {
              handleResp(deleteResource(selectedMenu!.id), {
                handleOk: (_data) => {
                  setMenus(menus?.filter((m) => m.id != selectedMenu?.id));
                  setSelectedMenu(undefined);
                  Toast.success("删除成功");
                },
              });
            }}
          >
            <Button disabled={selectedMenu == undefined} type="danger">
              删除
            </Button>
          </Popconfirm>
        </Space>
        <div className="overflow-auto flex-1 flex">
          <Tree
            showLine
            defaultExpandAll
            className="overflow-auto min-w-80"
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
          <div className="flex flex-col flex-1">
            <Form className="flex-1"></Form>
            <Table className="flex-1"></Table>
          </div>
        </div>
      </div>
      <MenuEditor
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
      ></MenuEditor>
    </>
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
