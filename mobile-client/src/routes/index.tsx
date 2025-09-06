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
      <div className="w-full [view-transition-name:main-content]">
        <Swiper autoplay loop>
          <Swiper.Item>
            <div className="w-full h-200px bg-blue-5 flex justify-center items-center font-size-10 select-none">
              Banner 1
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="w-full h-200px bg-purple flex justify-center items-center font-size-10 select-none">
              Banner 2
            </div>
          </Swiper.Item>
        </Swiper>
        <Grid columns={4} className="h-fit">
          <div
            className="flex flex-col items-center p-y-2 bg-white active:bg-blue-1 select-none"
            onClick={() => {
              navigate({ to: "/tests" });
            }}
          >
            <AppstoreOutline fontSize={50} />
            <div className="font-size-4 m-t-1">功能测试</div>
          </div>
          <div className="flex flex-col items-center p-y-2 bg-white active:bg-blue-1 select-none">
            <AppstoreOutline fontSize={50} />
            <div className="font-size-4 m-t-1">功能测试2</div>
          </div>
          <div className="flex flex-col items-center p-y-2 bg-white active:bg-blue-1 select-none">
            <AppstoreOutline fontSize={50} />
            <div className="font-size-4 m-t-1">功能测试3</div>
          </div>
          <div className="flex flex-col items-center p-y-2 bg-white active:bg-blue-1 select-none">
            <AppstoreOutline fontSize={50} />
            <div className="font-size-4 m-t-1">功能测试4</div>
          </div>
        </Grid>
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
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
        <div className="font-size-4 m-t-1">功能测试4</div>
      </div>
    </>
  );
}
