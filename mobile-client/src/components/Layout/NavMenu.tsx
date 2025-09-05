import { HTMLAttributes, ReactNode } from "react";
import { Divider, TabBar } from "antd-mobile";

export interface NavItemProps {
  id?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export interface NavMenuProps extends HTMLAttributes<HTMLDivElement> {
  items?: NavItemProps[];
  onItemChange?(key: string): void;
  activeId?: string;
}

export function NavMenu(props: NavMenuProps) {
  const { items, onItemChange, activeId, ...divProps } = props;

  return (
    <div {...divProps}>
      <TabBar
        activeKey={activeId}
        onChange={(key) => {
          if (onItemChange) {
            onItemChange(key);
          }
        }}
      >
        {items?.map((item, index) => (
          <>
            <TabBar.Item
              key={item.id ?? index}
              title={item.title}
              icon={item.icon}
            ></TabBar.Item>
          </>
        ))}
      </TabBar>
    </div>
  );
}
