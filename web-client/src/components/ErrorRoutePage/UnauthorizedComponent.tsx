import type { ErrorComponentProps } from "@tanstack/react-router";
import type { ErrorComponent } from "./defines";
import { Empty } from "@douyinfe/semi-ui";
import {
  IllustrationNoAccess,
  IllustrationNoAccessDark,
} from "@douyinfe/semi-illustrations";

export const UnauthorizedErrorName = "UnauthorizedError";

export const UnauthorizedComponent: ErrorComponent = {
  name: UnauthorizedErrorName,
  component: Component,
};

function Component(props: ErrorComponentProps) {
  return (
    <Empty
      image={<IllustrationNoAccess />}
      darkModeImage={<IllustrationNoAccessDark />}
      description={"无权限访问"}
    />
  );
}
