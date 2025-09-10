import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "@/components/Layout";
import { About } from "@/pages/About";
import { Home } from "@/pages/Home";
import { User } from "@/pages/User";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Layout
        navItems={[
          { key: "home", icon: "home", title: "Home", node: <Home></Home> },
          { key: "about", icon: "info", title: "About", node: <About></About> },
          { key: "user", icon: "user", title: "User", node: <User></User> },
        ]}
      ></Layout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
