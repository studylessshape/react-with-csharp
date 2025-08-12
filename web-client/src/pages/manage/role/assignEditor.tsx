import type { FeatResource } from "@/services";
import { useMenuState } from "@/stores";
import { featResourceToTreeData } from "@/utils/featsToTree";
import { Modal, Tree } from "@douyinfe/semi-ui";
import { useEffect, useMemo, useState } from "react";

export interface AssignModalProps {
  visible?: boolean;
  onCancel?: () => void;
  onConfirm?: (ids: number[]) => Promise<void>;
  selectedKeys?: string[];
}

export function AssignModal(props: AssignModalProps) {
  const menus = useMenuState((state) => state.menus);
  if (!menus) {
    return undefined;
  }
  const [selectedKeys, setSelectedKeys] = useState(
    undefined as string[] | undefined
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const menuTree = useMemo(
    () => featResourceToTreeData(menus),
    [menus, props.selectedKeys]
  );

  useEffect(() => {
    setSelectedKeys(props.selectedKeys);
  }, [props.selectedKeys]);

  return (
    <Modal
      title="分配模块"
      visible={props.visible}
      onCancel={props.onCancel}
      confirmLoading={confirmLoading}
      onOk={async () => {
        if (props.onConfirm) {
          setConfirmLoading(true);
          const ids =
            selectedKeys == undefined
              ? []
              : selectedKeys.map((key) => parseInt(key));
          await props.onConfirm(ids).finally(() => setConfirmLoading(false));
        }
      }}
    >
      <Tree
        treeData={menuTree}
        multiple
        defaultExpandAll
        checkRelation="unRelated"
        defaultValue={props.selectedKeys}
        onSelect={(key, selected) => {
          if (selected) {
            if (selectedKeys) {
              setSelectedKeys([...selectedKeys, key]);
            } else {
              setSelectedKeys([key]);
            }
          } else {
            if (selectedKeys) {
              setSelectedKeys(selectedKeys.filter((v) => v != key));
            }
          }
        }}
      ></Tree>
    </Modal>
  );
}
