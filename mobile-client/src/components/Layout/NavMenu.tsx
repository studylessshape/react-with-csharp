import {
  Navbar,
  NavbarGroup,
  Alignment,
  Tabs,
  Tab,
  TabId,
  MaybeElement,
  Icon,
  Divider,
  HTMLDivProps,
} from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { ReactNode } from "react";

export interface NavItemProps {
  id?: TabId;
  title?: ReactNode;
  icon?: IconName | MaybeElement;
}

export interface NavMenuProps extends HTMLDivProps {
  items?: NavItemProps[];
  align?: Alignment;
  onItemChange?(
    newTabId: TabId,
    prevTabId: TabId | undefined,
    event: React.MouseEvent<HTMLElement>
  ): void;
  activeId?: TabId;
}

export function NavMenu(props: NavMenuProps) {
  const { items, align, onItemChange, activeId, className, ...divProps } =
    props;

  return (
    <div
      className={`flex items-center justify-center${className ? ` ${className}` : ""}`}
      {...divProps}
    >
      <Tabs
        id="footerNav"
        selectedTabId={activeId}
        onChange={(newTabId, preTabId, event) => {
          if (onItemChange) {
            onItemChange(newTabId, preTabId, event);
          }
        }}
      >
        {items?.map((item, index) => (
          <Tab key={item.id ?? index} id={item.id ?? index}>
            <div className="flex flex-col items-center min-w-20 p-x-2 p-t-2">
              <Icon icon={item.icon}></Icon>
              <div>{item.title}</div>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
