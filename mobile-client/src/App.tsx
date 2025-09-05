import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: undefined!,
  defaultViewTransition: { types: ["slide-right"] },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
}

export default App;
