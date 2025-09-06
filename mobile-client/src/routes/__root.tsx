import {
  createRootRoute,
  Outlet,
  useCanGoBack,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RoutePath } from "@/types";
import {
  NavigationBar,
  NavigationBarItem,
  Layout,
  LayoutItem,
  LayoutMain,
  TopAppBar,
  TopAppBarTitle,
  getValue,
  NavigationBarType,
} from "@less/mdui-react";

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
      {/* <DefaultLayout
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
      </DefaultLayout> */}
      {/* <Layout></Layout> */}
      <Layout>
        <TopAppBar variant="center-aligned">
          <TopAppBarTitle>MobileCilent</TopAppBarTitle>
        </TopAppBar>
        <LayoutMain>
          <Outlet />
        </LayoutMain>
        <NavigationBar
          onChange={(evt) => {
            const value = (evt.target as NavigationBarType).value;

            if (value) {
              navigate({
                to: (evt.target as NavigationBarType).value,
                replace: true,
              });
            }
          }}
        >
          <NavigationBarItem value="/" icon="home">
            Home
          </NavigationBarItem>
          <NavigationBarItem value="/about" icon="info">
            About
          </NavigationBarItem>
        </NavigationBar>
      </Layout>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
