import type { IconSize } from "@douyinfe/semi-icons";
import Icon, * as Icons from "@douyinfe/semi-icons";
import React, { type DetailedHTMLProps, type ReactNode } from "react";

export interface SemiIconProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  name?: string;
  svg?: ReactNode;
  size?: IconSize;
  spin?: boolean;
  rotate?: number;
  prefixCls?: string;
  type?: string;
}

export class SemiIcon extends React.Component<SemiIconProps> {
  constructor(props: SemiIconProps) {
    super(props);
  }

  render(): ReactNode {
    const { name, svg, ...iconProps } = this.props;
    
    if (svg) {
      return <Icon svg={svg} {...iconProps}></Icon>;
    }

    if (name) {
      const icon = Icons[name];
      if (icon) return icon.render(iconProps);
    }

    return <></>;
  }
}
