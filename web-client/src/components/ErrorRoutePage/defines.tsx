import type { ErrorComponentProps } from "@tanstack/react-router";

type ErrorInnerComponent = (props: ErrorComponentProps) => any;

export interface ErrorComponent {
  name: string;
  component: ErrorInnerComponent;
}