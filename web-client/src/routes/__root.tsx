import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppLayout from "../components/Layout";
import { useUserState } from "../stores";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const user = useUserState((state) => state.user);
  const navigation = useNavigate();
  const location = useLocation();
  if (user == null && location.pathname != "/login") {
    navigation({ to: "/login" });
  }

  return (
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
        sidebar={user != null}
      >
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
