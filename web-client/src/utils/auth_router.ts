import { redirect, type ParsedLocation } from "@tanstack/react-router";
import type { MenuResourceState } from "../stores";
import type { FileRouteTypes } from "../routeTree.gen";
import { throwError } from "../components/ErrorRoutePage";
import { UnauthorizedErrorName } from "../components/ErrorRoutePage/UnauthorizedComponent";

const router = { to: "/" } as FileRouteTypes;

export function canAccessPage(
  location: ParsedLocation<{}>,
  menuState: MenuResourceState | undefined,
  redirectTo: typeof router.to
) {
  const menus = menuState?.menus;
  if (!menus || !menus.some((m) => m.url == location.pathname)) {
    throwError({ type: UnauthorizedErrorName });
  }
}