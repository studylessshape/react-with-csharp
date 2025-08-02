import type { ErrorComponentProps } from "@tanstack/react-router";
import type { ErrorComponent } from "./defines";
import { Empty } from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

export const UnknownErrorName = "UnknowError";

export const UnknownComponent: ErrorComponent = {
  name: UnknownErrorName,
  component: Component,
};

function Component(props: ErrorComponentProps) {
  return (
    <Empty
      image={<IllustrationConstruction />}
      darkModeImage={<IllustrationConstructionDark />}
      description={`未知错误: ${props.error.message}`}
    />
  );
}
