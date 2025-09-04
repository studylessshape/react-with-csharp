import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RoutePath } from "@/types";
import { ReactNode, useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Alignment,
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Text,
} from "@blueprintjs/core";
import { NavMenu } from "@/components/Layout/NavMenu";
import { DefaultLayout } from "@/components/Layout/DefaultLayout";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const [value, setValue] = useState(undefined);
  const [currentPath, setCurrentPath] = useState<RoutePath>("/");

  function to(link: RoutePath) {
    navigate({ to: link, replace: true });
    setCurrentPath(link);
  }

  return (
    <>
      <DefaultLayout
        title="Mobile Client"
        navItems={[
          { id: "/", title: "Home", icon: "home" },
          { id: "/about", title: "About", icon: "info-sign" },
        ]}
        onNavItemClick={(id) => to(id as RoutePath)}
        navProps={{ className: "shadow-1" }}
      >
        <Outlet />
      </DefaultLayout>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
