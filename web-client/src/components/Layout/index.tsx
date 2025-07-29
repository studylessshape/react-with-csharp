import { Layout, Nav } from "@douyinfe/semi-ui";
import {
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";
import React, { type PropsWithChildren } from "react";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

const NavSub = Nav.Sub;
const NavItem = Nav.Item;

export interface MenuItemProps {
  // Id
  key: string | number;
  // route path
  path: string;
  name?: string;
  descprition?: string;
  icon?: React.ReactNode | null;
  children?: MenuItemProps[];
}

export interface LayoutProps {
  title?: string;
  menu?: MenuItemProps[];
  layout?: boolean;
}

function getSelectedKeys(location: ParsedLocation<{}>, menu?: MenuItemProps[]) {
  var keys = [] as (string | number)[];
  if (menu) {
    keys.push(
      ...menu.filter((m) => m.path == location.pathname).map((m) => m.key)
    );
    menu
      .filter((m) => m.children && m.children.length > 0)
      .forEach((m) => {
        keys.push(...getSelectedKeys(location, m.children));
      });
  }
  return keys;
}

export default function AppLayout(props: PropsWithChildren<LayoutProps>) {
  const navigate = useNavigate();
  const location = useLocation();
  if (props.layout == false) {
    return (
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Content>{props.children}</Content>
      </Layout>
    );
  }

  const menus = props.menu ? toNav(props.menu) : undefined;

  const selectedKeys = getSelectedKeys(location, props.menu);

  function toNav(items: MenuItemProps[]) {
    return items.map((m) => {
      if (m.children != null) {
        return (
          <NavSub
            key={m.key}
            itemKey={m.key}
            text={m.descprition ?? m.name}
            icon={m.icon}
          >
            {toNav(m.children)}
          </NavSub>
        );
      } else {
        return (
          <NavItem
            key={m.key}
            itemKey={m.key}
            text={m.descprition ?? m.name}
            icon={m.icon}
            onClick={() => navigate({ to: m.path })}
          />
        );
      }
    });
  }

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Sider>
        <Nav defaultSelectedKeys={selectedKeys}>{menus}</Nav>
      </Sider>
      <Layout>
        <Header></Header>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
