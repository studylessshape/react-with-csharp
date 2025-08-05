import { Space, Spin, Typography } from "@douyinfe/semi-ui";

export function LoadingFallback() {
  return (
    <Space vertical className="w-screen h-screen justify-center">
      <Spin size="large"></Spin>
      <Typography.Text>加载页面中....</Typography.Text>
    </Space>
  );
}
