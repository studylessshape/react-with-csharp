import { Layout, Nav, Space } from "@douyinfe/semi-ui";
import { type PropsWithChildren } from "react";
import { UserAvatar, type UserAvatarProps } from "./UserAvatar";
import {
  NavMenu,
  type AutoCollapsedProps,
  type MenuItemProps,
} from "./NavMenu";
import { ThemeToggleButton } from "./ThemeToggleButton";
import type { NavHeaderProps } from "@douyinfe/semi-ui/lib/es/navigation";

export * from "./NavMenu";
export * from "./ThemeToggleButton";
export * from "./UserAvatar";

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

export interface LayoutProps {
  layout?: boolean;
  header?: React.ReactNode | NavHeaderProps;
  menu?: MenuItemProps[];
  userAvatar?: UserAvatarProps;
  /**
   * @summary Default header position is `navbar`
   */
  headerPosition?: "sidebar" | "navbar";
  /**
   * @summary Sets whether the navbar occupies the entire top
   */
  navbarFull?: boolean;
  sidebarAutoCollapsed?: AutoCollapsedProps;
}

function LayoutRoot(props: PropsWithChildren) {
  return <Layout className="w-screen h-screen">{props.children}</Layout>;
}

export default function AppLayout(props: PropsWithChildren<LayoutProps>) {
  if (props.layout == false) {
    return (
      <LayoutRoot>
        <Content>{props.children}</Content>
      </LayoutRoot>
    );
  }

  const headerPosition = props.headerPosition ?? "navbar";

  const header = (
    <Header className="semi-border-color border border-solid semi-always-dark">
      <Nav
        mode="horizontal"
        header={headerPosition == "navbar" ? props.header : undefined}
      >
        <Nav.Footer>
          <Space spacing="medium">
            <ThemeToggleButton />
            <UserAvatar {...props.userAvatar} />
          </Space>
        </Nav.Footer>
      </Nav>
    </Header>
  );
  const sidebar = (
    <Sider className="overflow-y-auto overflow-x-hidden flex flex-col shrink-0">
      <NavMenu
        className="h-full"
        menu={props.menu}
        header={headerPosition == "sidebar" ? props.header : undefined}
        autoCollapsed={props.sidebarAutoCollapsed}
      ></NavMenu>
    </Sider>
  );

  if (props.navbarFull == true) {
    return (
      <LayoutRoot>
        {header}
        <Layout>
          {sidebar}
          <Layout>
            <Content>{props.children}</Content>
          </Layout>
        </Layout>
      </LayoutRoot>
    );
  }

  return (
    <LayoutRoot>
      {sidebar}
      <Layout>
        {header}
        <Content className="overflow-auto">{props.children}</Content>
      </Layout>
    </LayoutRoot>
  );
}
