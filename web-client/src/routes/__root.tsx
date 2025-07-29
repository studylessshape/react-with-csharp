import {
  createRootRoute,
  HeadContent,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../components/Layout";
import { useFeatResources, useUserState } from "../stores";
import { useEffect } from "react";
import { getAccessResource, getUserProfile } from "../services";
import { useAuth } from "../hooks/useAuth";
import { handleResp } from "../utils/resp_flow";
import { featResourceToMenuProps } from "../utils/feares_to_menu";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [{ title: import.meta.env.PUBLIC_APP_TITLE }],
  }),
});

function RootComponent() {
  const user = useUserState((state) => state.user);
  const setUser = useUserState((state) => state.login);
  const isLogin = useAuth();
  const featResources = useFeatResources((state) => state.resources);
  const setFeatResources = useFeatResources((state) => state.setResources);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin && location.pathname != "/login") {
      navigation({ to: "/login" });
    } else if (!user) {
      handleResp(getUserProfile(), {
        handleOk: (data) => setUser(data),
        defaultMessage: "获取用户信息失败！",
      });
    } else if (user) {
      handleResp(getAccessResource(), {
        handleOk: (data) => setFeatResources(data),
        defaultMessage: "获取功能资源失败！",
      });
    }
  }, [user]);

  const menus = featResourceToMenuProps(true, featResources);

  return (
    <>
      <HeadContent />
      <AppLayout menu={menus} layout={user != null && isLogin}>
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
