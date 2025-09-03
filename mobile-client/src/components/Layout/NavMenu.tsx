import {
  Navbar,
  NavbarGroup,
  Alignment,
  Tabs,
  Tab,
  TabId,
  MaybeElement,
} from "@blueprintjs/core";
import { TabTitle } from "@blueprintjs/core/lib/esm/components/tabs/tabTitle";
import { Home, IconName, InfoSign } from "@blueprintjs/icons";
import { ReactNode } from "react";

export interface NavItemProps {
  id?: TabId;
  title?: ReactNode;
  icon?: IconName | MaybeElement;
}

export interface NavMenuProps {
  items?: NavItemProps[];
  align?: Alignment;
  onChange?(
    newTabId: TabId,
    prevTabId: TabId | undefined,
    event: React.MouseEvent<HTMLElement>
  ): void;
  activeId?: TabId;
}

export function NavMenu(props: NavMenuProps) {
  return (
    <Navbar>
      <NavbarGroup
        align={props.align}
        className={
          props.align == Alignment.CENTER ? "justify-center" : undefined
        }
      >
        <Tabs
          id="footerNav"
          size="large"
          selectedTabId={props.activeId}
          onChange={(newTabId, preTabId, event) => {
            if (props.onChange) {
              props.onChange(newTabId, preTabId, event);
            }
          }}
        >
          {props.items?.map((item, index) => (
            <Tab
              id={item.id ?? index}
              title={item.title}
              icon={item.icon}
            ></Tab>
          ))}
        </Tabs>
      </NavbarGroup>
    </Navbar>
  );
}
