import type { FileRouteTypes } from "@/routeTree.gen";
const routeProps = { to: "/" } as FileRouteTypes;

export type RoutePath = typeof routeProps.to;