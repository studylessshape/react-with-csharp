import {
  Outlet,
  createRootRoute,
  redirect,
  useCanGoBack,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { RoutePath } from "@/types";
import { useState } from "react";
import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import {
  AppOutline,
  ExclamationShieldOutline,
  UserOutline,
} from "antd-mobile-icons";
import { WaterMark } from "antd-mobile";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const location = useLocation();
  const router = useRouter();

  function to(link: RoutePath) {
    navigate({ to: link, replace: true, viewTransition: true });
  }

  return (
    <>
      <DefaultLayout
        title={`Mobile Client - ${location.pathname}`}
        activeId={location.pathname}
        back={canGoBack ? undefined : null}
        onBack={() => router.history.back()}
        hideFooter={canGoBack}
        navItems={[
          { id: "/", title: "Home", icon: <AppOutline /> },
          { id: "/about", title: "About", icon: <ExclamationShieldOutline /> },
          { id: "/user", title: "User", icon: <UserOutline /> },
        ]}
        onNavItemClick={(id) => to(id as RoutePath)}
      >
        <div className="h-full w-full bg-[var(--adm-color-border)] flex">
          <Outlet />
        </div>
      </DefaultLayout>
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
    </>
  );
}
