import {
  redirect,
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";
import { useMenuState, useUserState, type MenuResourceState } from "../stores";
import { useEffect, useState } from "react";
import type { FileRouteTypes } from "../routeTree.gen";

const router = { to: "/" } as FileRouteTypes;

export interface AuthOptions {
  /**
   * verify location pathname
   * @default false
   */
  location?: boolean;
  permissions?: string[];
  allPermission?: boolean;
  role?: string[];
}

export function useAuth(opts?: AuthOptions) {
  const userState = useUserState();
  const menuState = useMenuState();
  const location = useLocation();
  const isSystem = userState.hasRole("System");

  if (opts?.location == true) {
    if (!isSystem && !canAccessPage(location, menuState)) {
      return false;
    }
  }

  if (opts?.role && opts.role.length > 0) {
    if (!isSystem && !userState.hasAnyRole(opts.role)) {
      return false;
    }
  }

  if (opts?.permissions && opts.permissions.length > 0) {
    if (!isSystem) {
      if (
        opts.allPermission &&
        !userState.hasAllPermissions(opts.permissions)
      ) {
        return false;
      }

      if (
        !opts.allPermission &&
        !userState.hasAnyPermission(opts.permissions)
      ) {
        return false;
      }
    }
  }

  return true;
}

export function canAccessPage(
  location: ParsedLocation<{}>,
  menuState: MenuResourceState | undefined
) {
  const menus = menuState?.menus;
  return menus && menus.some((m) => m.url == location.pathname);
}
