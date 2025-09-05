import { forwardRef, HtmlHTMLAttributes, PropsWithChildren } from "react";

export interface FooterProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const Footer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FooterProps>
>((props, ref) => {
  const divProps = props as HtmlHTMLAttributes<HTMLDivElement>;

  return (
    <>
      <div ref={ref} {...divProps}>
        {props.children}
      </div>
    </>
  );
});
