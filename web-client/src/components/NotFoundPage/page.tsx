import {
  IllustrationNotFound,
  IllustrationNotFoundDark,
} from "@douyinfe/semi-illustrations";
import { Button, Empty, Space } from "@douyinfe/semi-ui";
import {
  useCanGoBack,
  useNavigate,
  type NotFoundRouteProps,
} from "@tanstack/react-router";

export default function (_props: NotFoundRouteProps) {
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  const backButton = !canGoBack ? undefined : (
    <Button
      theme="solid"
      onClick={() => {
        navigate({ to: ".." });
      }}
    >
      返回
    </Button>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Empty
        image={<IllustrationNotFound />}
        darkModeImage={<IllustrationNotFoundDark />}
        description={"不存在的页面"}
      />
      <Space spacing={10} className="m-t-4">
        {backButton}
        <Button
          theme={canGoBack ? undefined : "solid"}
          onClick={() => {
            navigate({ to: "/" });
          }}
        >
          主页
        </Button>
      </Space>
    </div>
  );
}
