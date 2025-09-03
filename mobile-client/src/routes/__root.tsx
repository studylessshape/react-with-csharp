import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RoutePath } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@/components/Layout";
import { Alignment, Navbar, NavbarGroup, Tab, Tabs } from "@blueprintjs/core";
import { Home, InfoSign } from "@blueprintjs/icons";
import { NavMenu } from "@/components/Layout/NavMenu";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const [value, setValue] = useState(undefined);
  const [currentPath, setCurrentPath] = useState<RoutePath>("/");

  function to(link: RoutePath) {
    navigate({ to: link });
    setCurrentPath(link);
  }

  return (
    <>
      <Layout
        footer={
          <NavMenu
            activeId={currentPath}
            align={Alignment.CENTER}
            onChange={(id) => to(id as RoutePath)}
            items={[
              { id: "/", title: "Home", icon: "home" },
              { id: "/about", title: "About", icon: "info-sign" },
            ]}
          ></NavMenu>
        }
      >
        <Outlet />
      </Layout>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
