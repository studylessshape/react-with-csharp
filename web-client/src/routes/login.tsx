import {
  createFileRoute,
  useCanGoBack,
  useMatch,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useUserState } from "../stores";
import { Toast } from "@douyinfe/semi-ui";
import { LoginPage } from "../components/LoginPage";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserState((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: canGoBack ? ".." : "/", replace: true });
    }
  });

  return (
    <LoginPage
      onSuccessLogin={() => {
        Toast.success({ content: "登录成功", theme: "light" });
        navigate({ to: "/", replace: true });
      }}
    ></LoginPage>
  );
}
