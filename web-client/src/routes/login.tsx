import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { titleAppend } from "../utils/title";
import { useState } from "react";
import { useUserState } from "../stores";
import { Button, Form, Toast, Typography } from "@douyinfe/semi-ui";
import { login } from "../services/login";
import type { LoginRequest } from "../services/interfaces";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  head: () => ({ meta: [{ title: titleAppend("登录") }] }),
});

function RouteComponent() {
  const [submitLogin, setSubmiLogin] = useState(false);
  const setStateLogin = useUserState((state) => state.login);
  const navigate = useNavigate();
  const isLogin = useAuth();

  if (isLogin) {
    Toast.warning({ content: "用户已登录", theme: "light" });
    navigate({ to: "/" });
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="border border-solid border-rd px-15 py-10"
        style={{
          borderColor: "var(--semi-color-border)",
          boxShadow: "var(--semi-shadow-elevated)",
        }}
      >
        <Typography.Title heading={2}>
          登录 {import.meta.env.PUBLIC_APP_TITLE}
        </Typography.Title>
        <Form
          // @ts-ignore
          layout="vertical"
          onSubmit={async (value) => {
            setSubmiLogin(true);
            var response = await login(value as LoginRequest).finally(() => {
              setSubmiLogin(false);
            });
            if (response.success && response.data) {
              setStateLogin(response.data);
              navigate({ to: "/" });
              Toast.success({ content: "登录成功！", theme: "light" });
            } else {
              Toast.error({
                content: response.message ?? "登录失败",
                theme: "light",
              });
            }
          }}
          disabled={submitLogin}
        >
          <Form.Input
            label="账户"
            field="account"
            rules={[{ required: true, min: 3, message: "账户长度至少为 3" }]}
          ></Form.Input>
          <Form.Input
            label="密码"
            field="password"
            type="password"
            rules={[{ required: true, min: 6, message: "密码长度至少为 6" }]}
          ></Form.Input>
          <Button
            type="primary"
            htmlType="submit"
            theme="solid"
            block
            loading={submitLogin}
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
