import React, { type PropsWithChildren } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  type MenuProps,
  Message,
} from "@arco-design/web-react";
import { IconCalendar, IconHome } from "@arco-design/web-react/icon";
import { useNavigate } from "@tanstack/react-router";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export interface MenuItemProps {
  // Id
  key: string | number;
  // route path
  path: string;
  name?: string | null;
  icon?: React.ReactNode | null;
}

export interface LayoutProps {
  title?: string;
  menu?: MenuItemProps[];
  sidebar?: boolean;
}

export default function AppLayout(props: PropsWithChildren<LayoutProps>) {
  const navigate = useNavigate();

  const menus = props.menu?.map((menu) => {
    return (
      <MenuItem key={menu.key.toString()}>
        <>
          {menu.icon}
          {menu.name ?? menu.path}
        </>
      </MenuItem>
    );
  });

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      {props.sidebar != false ? (
        <Sider>
          <Menu
            defaultSelectedKeys={props.menu
              ?.filter((m) => m.path == document.location.pathname)
              .map((m) => m.key.toString())}
            onClickMenuItem={(key) => {
              if (props.menu) {
                const keyIndex = props.menu?.findIndex(
                  (m) => m.key.toString() == key
                );
                if (keyIndex != -1) {
                  navigate({
                    to: props.menu[keyIndex].path,
                  });
                }
              }
            }}
          >
            {menus}
          </Menu>
        </Sider>
      ) : (
        <></>
      )}
      <Layout>
        <Header></Header>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
