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
import type React from "react";

interface ThrowErrorProps {
  message?: string;
  type: string;
}

export function throwError({ type, message }: ThrowErrorProps) {
  const error = new Error(message);
  error.name = type;
  throw error;
}

export interface ErrorRoutePageProps
  extends ErrorComponentProps,
    React.HTMLProps<HTMLDivElement> {}

export function ErrorRoutePage(props: ErrorRoutePageProps) {
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  const { error, info, reset, className, ...divProps } = props;

  var errorComponent: ErrorComponent = UnknownComponent;
  switch (error.name) {
    case UnauthorizedErrorName:
      errorComponent = UnauthorizedComponent;
      break;
    default:
      break;
  }

  const backButton = !canGoBack ? undefined : (
    <Button
      theme="solid"
      onClick={() => {
        reset();
        navigate({ to: ".." });
      }}
    >
      返回
    </Button>
  );

  return (
    <div
      className={`flex flex-col justify-center items-center ${className}`}
      {...divProps}
    >
      {errorComponent.component(props)}
      <Space spacing={10} className="m-t-4">
        {backButton}
        <Button
          theme={canGoBack ? undefined : "solid"}
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
        >
          主页
        </Button>
      </Space>
    </div>
  );
}
