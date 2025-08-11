import { RouteGuard } from "@/components/RouteGuard";
import type { DialogMode } from "@/pages/manage/interface";
import { RoleEditor } from "@/pages/manage/role/roleEditor";
import { RoleTable } from "@/pages/manage/role/roleTable";
import type { ClaimEntity } from "@/services";
import { createRole, deleteRoles, updateRole } from "@/services/role";
import { handleResp } from "@/utils/respFlow";
import { Toast } from "@douyinfe/semi-ui";
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

  function deleteRolesCallback(ids: number[]) {
    handleResp(deleteRoles(ids), {
      handleOk: () => {
        Toast.success({ content: "删除成功", theme: "light" });
        setRefresh(!refresh);
      },
    });
  }

  function showEditor(entity: ClaimEntity | undefined, mode: DialogMode) {
    setEditEntity(entity);
    setEditMode(mode);
    setEditorVisible(true);
  }

  return (
    <>
      <RoleTable
        deleteRoleCallback={(entity) => deleteRolesCallback([entity.id])}
        deleteRolesCallback={(entities) =>
          deleteRolesCallback(entities.map((e) => e.id))
        }
        refresh={refresh}
        createRoleCallback={() => showEditor(undefined, "add")}
        editRoleCallback={(entity) => showEditor(entity, "edit")}
      />
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
                setRefresh(!refresh);
                setEditorVisible(false);
              },
            });
          } else {
            handleResp(updateRole(entity), {
              handleOk: () => {
                Toast.success("修改成功");
                setRefresh(!refresh);
                setEditorVisible(false);
              },
            });
          }
        }}
      />
    </>
  );
}
