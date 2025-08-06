import type { PropsWithChildren, ReactNode } from "react";
import { useAuth, type AuthOptions } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import type { FileRouteTypes } from "../../routeTree.gen";

const routeProps = { to: "/" } as FileRouteTypes;

export interface RouteGuardProps extends AuthOptions {
  redirectTo?: typeof routeProps.to;
  placeholder?: ReactNode;
}

export function RouteGuard(props: PropsWithChildren<RouteGuardProps>) {
  const isAuth = useAuth(props);
  const navigate = useNavigate();
  if (!isAuth) {
    if (props.placeholder) {
      return props.placeholder;
    } else if (props.redirectTo) {
      navigate({ to: props.redirectTo, replace: true });
    }
  }

  if (isAuth) {
    return props.children;
  }

  return undefined;
}
