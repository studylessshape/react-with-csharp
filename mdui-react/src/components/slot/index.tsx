import type { HtmlHTMLAttributes } from "react";
import React from "react";

export interface SlotProps extends HtmlHTMLAttributes<HTMLDivElement> {
  slot?: string;
}

/** See [React - Lit#using-slots](https://lit.dev/docs/frameworks/react/#using-slots) */
export const Slot = React.forwardRef<HTMLDivElement, SlotProps>(
  (props, ref) => {
    const { slot, style, ...divProps } = props;

    return (
      <div
        ref={ref}
        slot={props.slot}
        style={{ ...style, display: "contents" }}
        {...divProps}
      ></div>
    );
  }
);
