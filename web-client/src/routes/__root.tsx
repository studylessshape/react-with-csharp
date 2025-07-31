import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../components/Layout";
import { useFeatResources, useUserState } from "../stores";
import { useEffect } from "react";
import { type FeatResource } from "../services";
import { featResourceToMenuProps } from "../utils/feares_to_menu";
import { Icon } from "@douyinfe/semi-ui";
import Logo from "../assets/logo.svg?react";
import { getAndSetUser } from "../utils/user_resource";

export interface RouteContext {
  featResources?: FeatResource[];
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
  head: () => ({
    meta: [{ title: import.meta.env.PUBLIC_APP_TITLE }],
  }),
});

function RootComponent() {
  const user = useUserState((state) => state.user);
  const featResources = useFeatResources((state) => state.resources);
  const isAuthenticated = useUserState((state) => state.isAuthenticated);
  const setFeatResource = useFeatResources((state) => state.setResources);
  const setUser = useUserState((state) => state.login);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname != "/login") {
        navigation({ to: "/login" });
      }
    }
    if (!user || !featResources) {
      getAndSetUser({
        userProfile: user,
        setFeatResource: setFeatResource,
        setUser: setUser,
      });
    }
  }, [user]);

  const menus = featResourceToMenuProps(true, featResources);

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
        sidebarAutoCollapsed={{ radio: 2.0 / 3.0 }}
      >
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
