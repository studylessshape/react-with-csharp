import { Button, ConfigProvider } from "@studylessshape/mdui-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Grid, Swiper } from "antd-mobile";
import { AppstoreOutline } from "antd-mobile-icons";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full">
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <ConfigProvider theme="dark" color="#9ecaff">
          <Button>ClickMe</Button>
          <div className="font-size-4 m-t-1">功能测试4dark</div>
          <div className="font-size-4 m-t-1">功能测试4dark</div>
          <div className="font-size-4 m-t-1">功能测试4dark</div>
        </ConfigProvider>
        <div className="font-size-4 m-t-1">end</div>
      </div>
    </>
  );
}
