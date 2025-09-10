import {
  Layout,
  TopAppBar,
  TopAppBarTitle,
  LayoutMain,
  NavigationBar,
  NavigationBarItem,
  ButtonIcon,
  NavigationDrawer,
  ConfigProvider,
  Theme,
  List,
  ListItem,
  Divider,
  Slot,
} from "@studylessshape/mdui-react";
import { Outlet, useCanGoBack, useRouter } from "@tanstack/react-router";
import { platform } from "@tauri-apps/plugin-os";
import { ReactNode, useState } from "react";

export interface NavItem {
  title?: ReactNode;
  node?: ReactNode;
  icon: string;
  key: string;
}

export interface LayoutProps {
  title?: ReactNode;
  hideBottom?: boolean;
  autoHideBottom?: boolean;
  navItems?: NavItem[];
}

function CustomLayout(props: LayoutProps) {
  const canGoBack = useCanGoBack();
  const router = useRouter();
  const [navigationBarHidden, setNavigationBarHidden] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navKey, setNavKey] = useState(
    props.navItems && props.navItems.length > 0
      ? props.navItems[0]?.key
      : undefined
  );

  const os = platform();
  const isMobile = os == "android" || os == "ios";
  const paddingTop = isMobile ? 36 : undefined;
  const paddingBottom = isMobile ? 20 : undefined;

  return (
    <ConfigProvider theme={theme}>
      <Layout
        className="w-screen h-screen relative overflow-hidden"
        style={
          navigationBarHidden ? { paddingBottom: paddingBottom } : undefined
        }
      >
        <TopAppBar
          className="select-none"
          style={
            paddingTop == undefined
              ? undefined
              : { height: 52 + paddingTop, paddingTop: paddingTop }
          }
        >
          <ButtonIcon
            icon={canGoBack ? "arrow_back_ios_new" : "menu"}
            onClick={() => {
              if (canGoBack) {
                router.history.back();
                setNavigationBarHidden(false);
              } else {
                setIsDrawerOpen(true);
              }
            }}
          ></ButtonIcon>
          <TopAppBarTitle>MobileCilent</TopAppBarTitle>
          <ButtonIcon
            icon={
              theme == "auto"
                ? "brightness_medium"
                : theme == "light"
                ? "light_mode"
                : "dark_mode"
            }
            onClick={() => {
              if (theme == "light") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
          ></ButtonIcon>
        </TopAppBar>
        <LayoutMain id="main-scrollable-area">
          <Slot>{canGoBack ? <Outlet /> : undefined}</Slot>
          {props.navItems?.map((v) => (
            <div
              key={v.key}
              style={{
                display: navKey == v.key && !canGoBack ? "contents" : "none",
              }}
            >
              {v.node}
            </div>
          ))}
        </LayoutMain>
        <NavigationBar
          value={navKey}
          onChange={(evt) => setNavKey(evt.target.value)}
          style={{
            ...(paddingBottom == undefined
              ? undefined
              : { height: 80 + paddingBottom, paddingBottom: paddingBottom }),
            display: navigationBarHidden ? "none" : undefined,
          }}
          hide={canGoBack}
          onHidden={() => setNavigationBarHidden(true)}
        >
          {props.navItems?.map((item) => (
            <NavigationBarItem key={item.key} icon={item.icon} value={item.key}>
              {item.title}
            </NavigationBarItem>
          ))}
        </NavigationBar>
        <NavigationDrawer
          open={isDrawerOpen}
          onOverlayClick={() => setIsDrawerOpen(false)}
        >
          <h3 className="m-l-2 select-none">Header</h3>
          <Divider></Divider>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </NavigationDrawer>
      </Layout>
    </ConfigProvider>
  );
}

export { CustomLayout as Layout };
