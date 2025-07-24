import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../components/Layout";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppLayout
        menu={[
          { key: 1, path: "/", name: "Home" },
          {
            key: 2,
            path: "/about",
            name: "About",
          },
        ]}
      >
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
