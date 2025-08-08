import type React from "react";
import { useUserState } from "../../stores";
import { useAuth } from "@/hooks/useAuth";

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
  const authed = useAuth(props);
  return <>{authed ? props.children : undefined}</>;
}
