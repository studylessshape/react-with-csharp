import { Layout, Nav, Space } from "@douyinfe/semi-ui";
import { type PropsWithChildren } from "react";
import { UserAvatar, type UserAvatarProps } from "./UserAvatar";
import { Navbar, type NavbarProps } from "./Navbar";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

export interface LayoutProps extends NavbarProps, UserAvatarProps {
  layout?: boolean;
}

export default function AppLayout(props: PropsWithChildren<LayoutProps>) {
  if (props.layout == false) {
    return (
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Content>{props.children}</Content>
      </Layout>
    );
  }

  return (
    <Layout className="w-screen h-screen">
      <Sider>
        <Navbar {...(props as NavbarProps)}></Navbar>
      </Sider>
      <Layout>
        <Header className="semi-color-bg-1 semi-border-color border border-solid">
          <Nav mode="horizontal">
            <Nav.Footer>
              <Space spacing="medium">
                <ThemeToggleButton />
                <UserAvatar {...(props as UserAvatarProps)} />
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
