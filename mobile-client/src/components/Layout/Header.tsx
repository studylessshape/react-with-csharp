import { forwardRef, HtmlHTMLAttributes, PropsWithChildren } from "react";

export interface HeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const Header = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HeaderProps>
>((props, ref) => {
  const divProps = props as HtmlHTMLAttributes<HTMLDivElement>;
  return (
    <div ref={ref} {...divProps}>
      {props.children}
    </div>
  );
});
