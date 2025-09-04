import { PropsWithChildren, ReactNode } from "react";
import { NavItemProps, NavMenu } from "./NavMenu";
import {
  Alignment,
  HTMLDivProps,
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
  onNavItemClick?: (id: TabId) => any;
}
export function DefaultLayout(props: PropsWithChildren<DefaultLayoutProps>) {
  return (
    <Layout
      header={
        props.title ? (
          <Navbar>
            <NavbarGroup>
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
            onItemChange={(id) => {
              if (props.onNavItemClick) {
                props.onNavItemClick(id);
              }
            }}
            items={[
              { id: "/", title: "Home", icon: "home" },
              { id: "/about", title: "About", icon: "info-sign" },
            ]}
            {...props.navProps}
          ></NavMenu>
        ) : undefined
      }
    >
      {props.children}
    </Layout>
  );
}
