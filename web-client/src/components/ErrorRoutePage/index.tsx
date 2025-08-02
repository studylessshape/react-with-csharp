import {
  useCanGoBack,
  useNavigate,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import {
  UnauthorizedComponent,
  UnauthorizedErrorName,
} from "./UnauthorizedComponent";
import type { ErrorComponent } from "./defines";
import { UnknownComponent } from "./UnknownErrorComponent";
import { Button, Space } from "@douyinfe/semi-ui";

interface ThrowErrorProps {
  message?: string;
  type: string;
}

export function throwError({ type, message }: ThrowErrorProps) {
  const error = new Error(message);
  error.name = type;
  throw error;
}

export function ErrorRoutePage(props: ErrorComponentProps) {
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  var errorComponent: ErrorComponent = UnknownComponent;
  switch (props.error.name) {
    case UnauthorizedErrorName:
      errorComponent = UnauthorizedComponent;
      break;
    default:
      break;
  }

  function BackButton() {
    if (!canGoBack) {
      return undefined;
    }

    return (
      <Button
        theme="solid"
        onClick={() => {
          props.reset();
          navigate({ to: ".." });
        }}
      >
        返回
      </Button>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {errorComponent.component(props)}
      <Space spacing={10} className="m-t-4">
        {BackButton()}
        <Button
          theme={canGoBack ? undefined : "solid"}
          onClick={() => {
            props.reset();
            navigate({ to: "/" });
          }}
        >
          主页
        </Button>
      </Space>
    </div>
  );
}
