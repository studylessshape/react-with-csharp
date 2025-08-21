import { createFileRoute } from "@tanstack/react-router";
import { RouteGuard } from "@/components/RouteGuard";
import { UserTable } from "@/pages/manage/user/userTable";
import { UserEditor } from "@/pages/manage/user/userEditor";
import { useState } from "react";
import type { UserDetails } from "@/services";
import type { DialogMode } from "@/pages/manage/interface";
import { handleResp } from "@/utils/respFlow";
import {
  createUser,
  deleteUserById,
  deleteUsersByIds,
  updateUser,
} from "@/services/user";
import { Toast } from "@douyinfe/semi-ui";

export const Route = createFileRoute("/manage/user")({
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
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState<DialogMode>("add");
  const [editUser, setEditUser] = useState(
    undefined as UserDetails | undefined
  );

  function showEditor(user: UserDetails | undefined, mode: DialogMode) {
    setEditUser(user);
    setEditMode(mode);
    setEditorVisible(true);
  }

  function refreshTable() {
    setRefresh(!refresh);
  }

  return (
    <>
      <UserTable
        className="p-2 h-[calc(100%-1rem)]"
        refresh={refresh}
        onAddClick={() => showEditor(undefined, "add")}
        onEditClick={(user) => showEditor(user, "edit")}
        onDeleteSingleClick={(user) => {
          handleResp(deleteUserById(user.id), {
            handleOk: () => {
              Toast.success("删除成功");
              refreshTable();
            },
          });
        }}
        onDeleteMultiClick={(users) => {
          handleResp(deleteUsersByIds(users.map((u) => u.id)), {
            handleOk: () => {
              Toast.success("删除成功");
              refreshTable();
            },
          });
        }}
      ></UserTable>
      <UserEditor
        mode={editMode}
        user={editUser}
        visible={editorVisible}
        onCancel={() => setEditorVisible(false)}
        onSubmitAdd={(user) => {
          handleResp(createUser(user), {
            handleOk: () => {
              Toast.success("创建成功");
              refreshTable();
              setEditorVisible(false);
            },
          });
        }}
        onSubmitUpdate={(user) => {
          handleResp(updateUser(user), {
            handleOk: () => {
              Toast.success("修改成功");
              refreshTable();
              setEditorVisible(false);
            },
          });
        }}
      ></UserEditor>
    </>
  );
}
