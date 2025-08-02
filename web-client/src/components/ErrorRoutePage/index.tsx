import { useNavigate, type ErrorComponentProps } from "@tanstack/react-router";
import {
  UnauthorizedComponent,
  UnauthorizedErrorName,
} from "./UnauthorizedComponent";
import type { ErrorComponent } from "./defines";
import { UnknownComponent } from "./UnknownErrorComponent";
import { Button, Space } from "@douyinfe/semi-ui";

export type ErrorTypes = typeof UnauthorizedErrorName | string;

export function ErrorRoutePage(props: ErrorComponentProps) {
  const navigate = useNavigate();
  var errorComponent: ErrorComponent = UnknownComponent;
  switch (props.error.name) {
    case UnauthorizedErrorName:
      errorComponent = UnauthorizedComponent;
      break;
    default:
      break;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {errorComponent.component(props)}
      <Space spacing={10} className="m-t-4">
        <Button
          type="primary"
          theme="solid"
          onClick={() => navigate({ to: ".." })}
        >
          返回
        </Button>
        <Button onClick={() => navigate({ to: "/" })}>主页</Button>
      </Space>
    </div>
  );
}
