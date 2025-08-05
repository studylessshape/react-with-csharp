import { useState } from "react";
import { Button, Form, Icon, Toast, Typography } from "@douyinfe/semi-ui";
import Logo from "../../assets/logo.svg?react";
import { useUserState } from "../../stores";

export interface LoginProps {
  onSuccessLogin: () => void;
}

export function LoginPage(props: LoginProps) {
  const [submitLogin, setSubmiLogin] = useState(false);
  const login = useUserState((state) => state.login);

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
            login(
              value.account,
              value.password,
              () => props.onSuccessLogin(),
              (_code, _err, message) => Toast.error({ content: message ?? "登录失败" })
            ).finally(() => {
              setSubmiLogin(false);
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
