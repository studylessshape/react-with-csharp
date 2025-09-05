import {
  PropsWithChildren,
  ReactNode,
  MouseEvent,
  HtmlHTMLAttributes,
  useMemo,
} from "react";
import { NavItemProps, NavMenu } from "./NavMenu";
import { NavBar } from "antd-mobile";
import { Layout } from ".";
import { useCanGoBack, useNavigate } from "@tanstack/react-router";

export interface DefaultLayoutProps {
  title?: ReactNode;
  navItems?: NavItemProps[];
  activeId?: string;
  back?: ReactNode;
  onBack?: () => void;
  hideFooter?: boolean;
  navProps?: HtmlHTMLAttributes<HTMLDivElement>;
  onNavItemClick?: (id: string) => any;
  onMenuButtonClick?: (event: MouseEvent<HTMLElement>) => void;
}
export function DefaultLayout(props: PropsWithChildren<DefaultLayoutProps>) {
  const footer = useMemo(
    () =>
      props.navItems ? (
        <NavMenu
          activeId={props.activeId}
          onItemChange={(id) => {
            if (props.onNavItemClick) {
              props.onNavItemClick(id);
            }
          }}
          items={props.navItems}
          {...props.navProps}
        ></NavMenu>
      ) : undefined,
    [props.navItems]
  );

  return (
    <Layout
      header={
        props.title ? (
          <NavBar back={props.back} onBack={props.onBack}>
            {props.title}
          </NavBar>
        ) : undefined
      }
      footer={
        props.hideFooter == true ? undefined : props.navItems ? (
          <NavMenu
            activeId={props.activeId}
            onItemChange={(id) => {
              if (props.onNavItemClick) {
                props.onNavItemClick(id);
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
