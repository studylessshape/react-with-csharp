import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
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
import { Icon } from "@douyinfe/semi-ui";
import Logo from "../assets/logo.svg?react";
import { NotFound } from "../components/NotFoundPage";
import { featResourceToMenuProps } from "../utils/feats_to_menu";
import { ErrorRoutePage } from "../components/ErrorRoutePage";
import { useEffect } from "react";
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
  const user = useUserState((state) => state.user);
  const isAuthenticated = useUserState((state) => state.isAuthenticated);
  const menuResources = useMenus((state) => state.menus);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  });

  const menus = featResourceToMenuProps(true, menuResources);

  return (
    <>
      <HeadContent />
      <AppLayout
        menu={menus}
        layout={user != null && isAuthenticated}
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
