import {
  IllustrationNotFound,
  IllustrationNotFoundDark,
} from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";
import type { NotFoundRouteProps } from "@tanstack/react-router";

export default function (_props: NotFoundRouteProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Empty
        image={<IllustrationNotFound />}
        darkModeImage={<IllustrationNotFoundDark />}
        description={"不存在的页面"}
      />
    </div>
  );
}
