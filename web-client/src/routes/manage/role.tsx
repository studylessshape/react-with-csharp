import { RouteGuard } from "@/components/RouteGuard";
import type { DialogMode } from "@/pages/manage/interface";
import { AssignModal } from "@/pages/manage/role/assignEditor";
import { RoleEditor } from "@/pages/manage/role/roleEditor";
import { RoleTable } from "@/pages/manage/role/roleTable";
import type { ClaimEntity } from "@/services";
import {
  assignResources,
  createRole,
  deleteRoles,
  getRoleModules,
  updateRole,
} from "@/services/role";
import { useMenuState, useUserState } from "@/stores";
import { handleResp } from "@/utils/respFlow";
import { Spin, Toast } from "@douyinfe/semi-ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/manage/role")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RouteGuard location redirectTo="/unauthorized">
      <RouteContent />
    </RouteGuard>
  );
}
function RouteContent() {
  const [editorVisible, setEditorVisible] = useState(false);
  const [editMode, setEditMode] = useState("add" as DialogMode);
  const [editEntity, setEditEntity] = useState(
    undefined as ClaimEntity | undefined
  );
  const [refresh, setRefresh] = useState(false);
  const [assignVisible, setAssignVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(
    undefined as string[] | undefined
  );

  function refreshTable() {
    setRefresh(!refresh);
  }

  function deleteRolesCallback(ids: number[]) {
    handleResp(deleteRoles(ids), {
      handleOk: () => {
        Toast.success({ content: "删除成功", theme: "light" });
        refreshTable();
      },
    });
  }

  function showEditor(entity: ClaimEntity | undefined, mode: DialogMode) {
    setEditEntity(entity);
    setEditMode(mode);
    setEditorVisible(true);
  }

  function showAssignModal(entity: ClaimEntity) {
    setLoading(true);
    setEditEntity(entity);
    handleResp(getRoleModules(entity.id), {
      handleOk: (data) => {
        setSelectedKeys(data.map((f) => f.id.toString()));
        setAssignVisible(true);
      },
    }).finally(() => setLoading(false));
  }

  return (
    <>
      <Spin
        spinning={loading}
        tip="加载角色模块中..."
        size="large"
        style={{ height: "100%" }}
        childStyle={{ height: "100%" }}
      >
        <RoleTable
          className="p-2 h-[calc(100%-1rem)]"
          deleteRoleCallback={(entity) => deleteRolesCallback([entity.id])}
          deleteRolesCallback={(entities) =>
            deleteRolesCallback(entities.map((e) => e.id))
          }
          refresh={refresh}
          createRoleCallback={() => showEditor(undefined, "add")}
          editRoleCallback={(entity) => showEditor(entity, "edit")}
          assignModuleCallback={showAssignModal}
        ></RoleTable>
      </Spin>
      <RoleEditor
        visible={editorVisible}
        mode={editMode}
        entity={editEntity}
        onCancel={() => setEditorVisible(false)}
        onSubmit={(entity) => {
          if (editMode == "add") {
            handleResp(createRole({ role: entity.claimValue }), {
              handleOk: () => {
                Toast.success("添加成功");
                refreshTable();
                setEditorVisible(false);
              },
            });
          } else {
            handleResp(updateRole(entity), {
              handleOk: () => {
                Toast.success("修改成功");
                refreshTable();
                setEditorVisible(false);
              },
            });
          }
        }}
      ></RoleEditor>
      <AssignModal
        visible={assignVisible}
        onCancel={() => setAssignVisible(false)}
        selectedKeys={selectedKeys}
        onConfirm={async (ids) => {
          if (editEntity) {
            handleResp(
              assignResources({ roleId: editEntity.id, featResourceIds: ids }),
              {
                handleOk: () => {
                  Toast.success("分配成功");
                  setAssignVisible(false);
                  refreshTable();
                },
              }
            );
          }
        }}
      ></AssignModal>
    </>
  );
}
