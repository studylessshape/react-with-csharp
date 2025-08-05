import {
  redirect,
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";
import { useMenuState, useUserState, type MenuResourceState } from "../stores";
import { useEffect } from "react";
import type { FileRouteTypes } from "../routeTree.gen";

const router = { to: "/" } as FileRouteTypes;

export interface AuthOptions {
  /**
   * verify location pathname
   * @default false
   */
  location?: boolean;
  permissions?: string[];
}

export function useAuth(opts?: AuthOptions) {
  const userState = useUserState();
  const menuState = useMenuState();
  const location = useLocation();
  const navigate = useNavigate();
  const isSystem = userState.hasRole("System");

  useEffect(() => {
    if (opts?.location == true) {
      if (!isSystem) {
        canAccessPage(location, menuState);
        navigate({ to: "/unauthorized", replace: true });
      }
    }

    if (opts?.permissions && opts.permissions.length > 0) {
      if (!isSystem && !userState.hasAnyPermission(opts.permissions)) {
        canAccessPage(location, menuState);
        navigate({ to: "/unauthorized", replace: true });
      }
    }
  });
}

export function canAccessPage(
  location: ParsedLocation<{}>,
  menuState: MenuResourceState | undefined
) {
  const menus = menuState?.menus;
  return menus && menus.some((m) => m.url == location.pathname);
}
