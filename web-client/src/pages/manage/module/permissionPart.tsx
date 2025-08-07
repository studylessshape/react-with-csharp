import {
  createPermission,
  getMenuPermissions,
  type FeatResource,
} from "@/services";
import { PermissionTable } from "./permissionTable";
import { Button, Space, Toast } from "@douyinfe/semi-ui";
import { DeleteButton } from "@/components/PermissionButton/DeleteButton";
import { IconPlus } from "@douyinfe/semi-icons";
import { FeatResourceEditor } from "./featResourceEditor";
import { useState } from "react";
import type { DialogMode } from "./types";
import { DataTable, type PaginationData } from "@/components/DataTable";
import { handleResp } from "@/utils/resp_flow";
import { featResourceToDataSource } from "@/utils/feat_to_data_source";

export interface PermissionPartProps {
  parent?: FeatResource;
}

export interface PageInfo {
  total?: number;
  page?: number;
  pageSize: number;
}

export function PermissionPart(props: PermissionPartProps) {
  const [dialogMode, setDialogMode] = useState("add" as DialogMode);
  const [dialogVisible, setDialogVisiable] = useState(false);
  const [selectedRows, setSelectedRows] = useState(
    undefined as FeatResource[] | undefined
  );
  const [editFeat, setEditFeat] = useState(
    undefined as FeatResource | undefined
  );

  function showDialog(mode: DialogMode) {
    setDialogMode(mode);
    setDialogVisiable(true);
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Space>
          <Button
            icon={<IconPlus />}
            theme="solid"
            onClick={() => showDialog("add")}
          >
            添加许可
          </Button>
          <DeleteButton buttonChildren="删除选中许可"></DeleteButton>
        </Space>
        <PermissionTable parentId={props.parent?.id} />
      </div>
      <FeatResourceEditor
        from="permission"
        mode={dialogMode}
        visible={dialogVisible}
        feat={editFeat}
        onSubmit={(feat) => {
          handleResp(createPermission(feat), {
            handleOk: (data) => {},
          });
        }}
        onCancel={() => setDialogVisiable(false)}
      />
    </>
  );
}
