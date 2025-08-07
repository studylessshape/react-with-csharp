import { Button, Popconfirm } from "@douyinfe/semi-ui";
import { PermissionGuard } from "../PermissionGuard";
import type { ReactNode } from "react";
import type { Theme } from "@douyinfe/semi-ui/lib/es/button";
import type { Position } from "@douyinfe/semi-ui/lib/es/tooltip";

export interface DeleteButtonProps {
  permissions?: string[];
  content?: ReactNode;
  title?: ReactNode;
  position?: Position;
  onConfirm?: (e: React.MouseEvent) => Promise<any> | void;
  onCancel?: (e: React.MouseEvent) => Promise<any> | void;
  size?: "default" | "small" | "large";
  type?: "warning" | "primary" | "secondary" | "danger" | "tertiary";
  htmlType?: "button" | "reset" | "submit";
  theme?: Theme;
  disabled?: boolean;
}

export function DeleteButton(props: DeleteButtonProps) {
  return (
    <PermissionGuard permissions={props.permissions}>
      <Popconfirm
        title={props.title ?? "是否确认删除？"}
        content={props.content}
        position={props.position}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
        disabled={props.disabled}
      >
        <Button
          size={props.size}
          type={props.type ?? "danger"}
          theme={props.theme ?? "solid"}
          htmlType={props.htmlType}
          disabled={props.disabled}
        >
          删除
        </Button>
      </Popconfirm>
    </PermissionGuard>
  );
}
