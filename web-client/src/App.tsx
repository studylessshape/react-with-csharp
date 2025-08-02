import { createRouter, Route, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useMenus, useUserState } from "./stores";
import { Toast } from "@douyinfe/semi-ui";
import { handleResp } from "./utils/resp_flow";
import { getAccessMenu } from "./services";
import { useEffect } from "react";

// Create a new router instance
const router = createRouter({ routeTree, context: undefined! });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export interface AppProps {}

export default function (_props: AppProps) {
  const user = useUserState();
  const menu = useMenus();

  useEffect(() => {
    if (user.isAuthenticated) {
      if (!user.user) {
        user.getLoginState((_err, message) =>
          Toast.error(message ?? "获取用户信息失败")
        );
      }
      else if (!menu.menus) {
        handleResp(getAccessMenu(), {
          handleOk: (data) => menu.setMenus(data),
          defaultMessage: "获取菜单失败",
        });
      }
    }
  }, [user.isAuthenticated, user.user, menu.menus]);

  if (
    !user.isAuthenticated ||
    (user.isAuthenticated && user.user && menu.menus)
  ) {
    return (
      <RouterProvider router={router} context={{ user: user, menus: menu }} />
    );
  }
}
