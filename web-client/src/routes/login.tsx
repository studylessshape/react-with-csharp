import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { titleAppend } from "../utils/title";
import { useState } from "react";
import { useFeatResources, useUserState } from "../stores";
import { Button, Form, Icon, Typography } from "@douyinfe/semi-ui";
import { login } from "../services/account";
import type { LoginRequest } from "../services/interfaces";
import Logo from "../assets/logo.svg?react";
import { handleResp } from "../utils/resp_flow";
import { getAndSetUser } from "../utils/user_resource";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  head: () => ({ meta: [{ title: titleAppend("登录") }] }),
});

function RouteComponent() {
  const [submitLogin, setSubmiLogin] = useState(false);
  const isAuthenticated = useUserState((state) => state.isAuthenticated);
  const setFeatResource = useFeatResources((state) => state.setResources);
  const setUser = useUserState((state) => state.login);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate({ to: "/" });
    return;
  }

  return (
    <div className="w-full h-full flex justify-center items-center background-svg">
      <div className="border border-solid border-rd px-15 py-10 semi-border-color semi-shadow-elevated semi-color-bg-1">
        <div className="flex items-center">
          <Icon svg={<Logo height={100} width={100} />} />
          <Typography.Title heading={2} className="select-none m-auto">
            {import.meta.env.PUBLIC_APP_TITLE}
          </Typography.Title>
        </div>
        <Form
          // @ts-ignore
          layout="vertical"
          onSubmit={async (value) => {
            setSubmiLogin(true);
            handleResp(login(value as LoginRequest), {
              handleOk: async (userProfile) => {
                await getAndSetUser({
                  userProfile: userProfile,
                  setUser: setUser,
                  setFeatResource: setFeatResource,
                });
              },
              defaultMessage: "登录失败",
            }).finally(() => {
              setSubmiLogin(false);
              navigate({ to: "/" });
            });
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
