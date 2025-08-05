import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useMenuState, useUserState } from "./stores";
import { ConfigProvider } from "@douyinfe/semi-ui";

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
  const menu = useMenuState();

  return (
    <ConfigProvider>
      <RouterProvider router={router} context={{ user: user, menus: menu }} />
    </ConfigProvider>
  );
}
