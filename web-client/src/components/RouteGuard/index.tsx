import type { PropsWithChildren, ReactNode } from "react";
import { useAuth, type AuthOptions } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import type { FileRouteTypes } from "../../routeTree.gen";
import { useUserState } from "@/stores";

const routeProps = { to: "/" } as FileRouteTypes;

export interface RouteGuardProps extends AuthOptions {
  redirectTo?: typeof routeProps.to;
  loginTo?: typeof routeProps.to;
  placeholder?: ReactNode;
}

export function RouteGuard(props: PropsWithChildren<RouteGuardProps>) {
  const isAuth = useAuth(props);
  const isLogin = useUserState((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (!isLogin) {
    if (props.loginTo) {
      navigate({ to: props.loginTo ?? "/login", replace: true });
    }
    return props.placeholder;
  }

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

  return props.placeholder;
}
