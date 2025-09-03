import {
  createRef,
  forwardRef,
  PropsWithChildren,
  Ref,
  RefObject,
} from "react";

export interface HeaderProps {}

export const Header = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HeaderProps>
>((props, ref) => {
  return <div ref={ref}>{props.children}</div>;
});
