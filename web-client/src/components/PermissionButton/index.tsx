import type { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import { PermissionGuard } from "../PermissionGuard";
import { Button } from "@douyinfe/semi-ui";

export interface PermissionButtonProps extends ButtonProps {
  permissions?: string[];
}

export function PermissionButton(props: PermissionButtonProps) {
  const { permissions, ...buttonProps } = props;
  return (
    <PermissionGuard permissions={permissions}>
      <Button {...buttonProps} />
    </PermissionGuard>
  );
}
