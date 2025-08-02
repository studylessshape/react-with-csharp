import type React from "react";
import { useUserState } from "../../stores";

export interface PermissionGuardProps {
  permissions?: string[];
  /**
   * @summary If the user need have all permissions
   */
  all?: boolean;
}

export function PermissionGuard(
  props: React.PropsWithChildren<PermissionGuardProps>
) {
  const user = useUserState();
  const { permissions, all, children } = props;
  var result: React.ReactNode | undefined = undefined;

  if (!permissions || permissions.length == 0) {
    result = children;
  } else if (user) {
    if (
      (all == true && user.hasAllPermissions(permissions)) ||
      (all != true && user.hasAnyPermission(permissions))
    ) {
      result = children;
    }
  }
  return result;
}
