import { forwardRef, LegacyRef, PropsWithChildren, Ref } from "react";
export interface FooterProps {}

export const Footer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FooterProps>
>((props, ref) => {
  return <div ref={ref} className="p-inset-5">{props.children}</div>;
});
