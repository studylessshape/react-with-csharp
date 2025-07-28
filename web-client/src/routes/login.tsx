import { Button, Form, Input, Tabs } from "@arco-design/web-react";
import { createFileRoute } from "@tanstack/react-router";

const FormItem = Form.Item;

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "Center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "10px",
          padding: "20px",
          borderColor: "var(--color-border)",
        }}
      >
        <Form layout="vertical">
          <FormItem label="账户" requiredSymbol={false}>
            <Input placeholder="请输入账户"></Input>
          </FormItem>
          <FormItem label="密码" requiredSymbol={false}>
            <Input placeholder="请输入密码" type="password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" long>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
