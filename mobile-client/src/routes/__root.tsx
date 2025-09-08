import {
  createRootRoute,
  useCanGoBack,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { RoutePath } from "@/types";
import { Layout } from "@/components/Layout";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Layout
        navItems={[
          { icon: "home", value: "/", title: "Home" },
          { icon: "info", value: "/about", title: "About" },
          { icon: "account_circle", value: "/user", title: "User" },
        ]}
      ></Layout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
