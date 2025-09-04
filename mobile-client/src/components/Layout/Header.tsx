import { HTMLDivProps } from "@blueprintjs/core";
import {
  createRef,
  forwardRef,
  PropsWithChildren,
  Ref,
  RefObject,
} from "react";

export interface HeaderProps extends HTMLDivProps {}

export const Header = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HeaderProps>
>((props, ref) => {
  const divProps = props as HTMLDivProps;
  return (
    <div ref={ref} {...divProps}>
      {props.children}
    </div>
  );
});
