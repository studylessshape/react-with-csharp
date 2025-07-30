import { Avatar, Button, Layout, Nav, Space } from "@douyinfe/semi-ui";
import {
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";
import React, { type PropsWithChildren } from "react";
import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import { useThemeState } from "../../stores";

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
  const currentTheme = useThemeState((state) => state.mode);
  const setTheme = useThemeState((state) => state.setMode);

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

  if (props.layout == false) {
    return (
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Content>{props.children}</Content>
      </Layout>
    );
  }

  const menus = props.menu ? toNav(props.menu) : undefined;

  const selectedKeys = getSelectedKeys(location, props.menu);

  return (
    <Layout className="w-screen h-screen">
      <Sider>
        <Nav
          className="h-full"
          defaultSelectedKeys={selectedKeys}
          header={{ text: import.meta.env.PUBLIC_APP_TITLE }}
          footer={{ collapseButton: true }}
        >
          {menus}
        </Nav>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "var(--semi-color-bg-1)",
            border: "1px solid var(--semi-color-border)",
          }}
        >
          <Nav mode="horizontal">
            <Nav.Footer>
              <Space spacing="medium">
                <Button
                  icon={
                    currentTheme == "light" ? (
                      <IconSun size="large" />
                    ) : (
                      <IconMoon size="large" />
                    )
                  }
                  onClick={() => {
                    if (currentTheme == "light") {
                      setTheme("dark");
                    } else {
                      setTheme("light");
                    }
                  }}
                  theme="borderless"
                  type="tertiary"
                ></Button>
                <Avatar size="small"></Avatar>
              </Space>
            </Nav.Footer>
          </Nav>
        </Header>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
