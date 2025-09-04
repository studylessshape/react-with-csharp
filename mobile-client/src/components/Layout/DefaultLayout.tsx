import { PropsWithChildren, ReactNode, MouseEvent } from "react";
import { NavItemProps, NavMenu } from "./NavMenu";
import {
  Alignment,
  Button,
  Divider,
  HTMLDivProps,
  Icon,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  TabId,
} from "@blueprintjs/core";
import { Layout } from ".";

export interface DefaultLayoutProps {
  title?: ReactNode;
  navItems?: NavItemProps[];
  activeId?: TabId;
  navProps?: HTMLDivProps;
  onNavItemClick?: (id: TabId, event: MouseEvent<HTMLElement>) => any;
  onMenuButtonClick?: (event: MouseEvent<HTMLElement>) => void;
}
export function DefaultLayout(props: PropsWithChildren<DefaultLayoutProps>) {
  return (
    <Layout
      header={
        props.title ? (
          <Navbar>
            <NavbarGroup>
              {props.onMenuButtonClick ? (
                <>
                  <Button
                    icon="menu"
                    size="large"
                    variant="minimal"
                    onClick={props.onMenuButtonClick}
                  ></Button>
                  <Divider></Divider>
                </>
              ) : undefined}

              <NavbarHeading>{props.title}</NavbarHeading>
            </NavbarGroup>
          </Navbar>
        ) : undefined
      }
      footer={
        props.navItems ? (
          <NavMenu
            activeId={props.activeId}
            align={Alignment.CENTER}
            onItemChange={(id, preId, event) => {
              if (props.onNavItemClick) {
                props.onNavItemClick(id, event);
              }
            }}
            items={props.navItems}
            {...props.navProps}
          ></NavMenu>
        ) : undefined
      }
    >
      {props.children}
    </Layout>
  );
}
