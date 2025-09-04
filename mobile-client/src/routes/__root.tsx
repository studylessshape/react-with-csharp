import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RoutePath } from "@/types";
import { ReactNode, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Alignment,
  Button,
  Drawer,
  DrawerSize,
  Menu,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  OverlaysProvider,
  Text,
} from "@blueprintjs/core";
import { NavMenu } from "@/components/Layout/NavMenu";
import { DefaultLayout } from "@/components/Layout/DefaultLayout";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState<RoutePath>("/");
  function to(link: RoutePath) {
    navigate({ to: link, replace: true });
    setCurrentPath(link);
  }

  return (
    <>
      <DefaultLayout
        title="Mobile Client"
        activeId={currentPath}
        navItems={[
          { id: "/", title: "Home", icon: "home" },
          { id: "/about", title: "About", icon: "info-sign" },
          { id: "/user", title: "User", icon: "user" },
        ]}
        onNavItemClick={(id) => to(id as RoutePath)}
        navProps={{ className: "justify-center shadow-1" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #007bff 0%, #007bff 50%, white 50%, white 100%)",
          }}
        >
          <Outlet />
        </div>
      </DefaultLayout>
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
    </>
  );
}
