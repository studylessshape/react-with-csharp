import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../components/Layout";
import {
  useMenus,
  useUserState,
  type MenuResourceState,
  type UserState,
} from "../stores";
import { Icon, Toast } from "@douyinfe/semi-ui";
import Logo from "../assets/logo.svg?react";
import { NotFound } from "../components/NotFoundPage";
import { featResourceToMenuProps } from "../utils/feats_to_menu";
import { useEffect, useMemo } from "react";
import { ErrorRoutePage } from "../components/ErrorRoutePage";
import { handleResp } from "../utils/resp_flow";
import { getAccessMenu } from "../services";

export interface RouteContext {
  user: UserState;
  menus: MenuResourceState;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorRoutePage,
  head: () => ({
    meta: [{ title: import.meta.env.PUBLIC_APP_TITLE }],
  }),
});

function RootComponent() {
  const user = useUserState((state) => state);
  const isAuthenticated = useUserState((state) => state.isAuthenticated);
  const menu = useMenus((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login", replace: true });
    } else {
      if (!user.user) {
        user.getLoginState((code, _err, message) => {
          Toast.error(message ?? "获取用户信息失败");
          if (code == 401) {
            navigate({ to: "/login", replace: true });
          }
        });
      } else if (!menu.menus) {
        handleResp(getAccessMenu(), {
          handleOk: (data) => menu.setMenus(data),
          handleErr: (code, _err, message) => {
            Toast.error(message ?? "获取菜单失败");
            if (code == 401) {
              navigate({ to: "/login", replace: true });
            }
          },
        });
      }
    }
  });

  const menus = useMemo(
    () => featResourceToMenuProps(true, menu.menus),
    [menu.menus]
  );

  return (
    <>
      <HeadContent />
      <AppLayout
        menu={menus}
        layout={user.user != null && isAuthenticated}
        header={{
          logo: (
            <Icon
              svg={<Logo height={36} width={36} />}
              className="font-size-9"
            />
          ),
          text: import.meta.env.PUBLIC_APP_TITLE,
          link: "/",
        }}
        sidebarAutoCollapsed={{ minWidth: 520, radio: 2.0 / 3.0 }}
      >
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
