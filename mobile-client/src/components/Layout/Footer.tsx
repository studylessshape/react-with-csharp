import { HTMLDivProps } from "@blueprintjs/core";
import { forwardRef, LegacyRef, PropsWithChildren, Ref } from "react";
export interface FooterProps extends HTMLDivProps {}

export const Footer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FooterProps>
>((props, ref) => {
  const divProps = props as HTMLDivProps;

  return (
    <div ref={ref} {...divProps}>
      {props.children}
    </div>
  );
});
