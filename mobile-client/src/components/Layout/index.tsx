import { RoutePath } from "@/types";
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
  LayoutType,
} from "@studylessshape/mdui-react";
import {
  Outlet,
  useCanGoBack,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { platform } from "@tauri-apps/plugin-os";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface NavItem {
  title?: ReactNode;
  value: RoutePath;
  icon: string;
}

export interface LayoutProps {
  title?: ReactNode;
  hideBottom?: boolean;
  autoHideBottom?: boolean;
  navItems?: NavItem[];
}

function CustomLayout(props: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = useCanGoBack();
  const router = useRouter();
  const [navigationBarHidden, setNavigationBarHidden] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const os = platform();
  const isMobile = os == "android" || os == "ios";
  const paddingTop = isMobile ? 36 : undefined;
  const paddingBottom = isMobile ? 20 : undefined;
  const showNavigationBar =
    props.navItems &&
    props.navItems.some((item) => item.value == location.pathname);

  return (
    <ConfigProvider theme={theme} color="#f9abff">
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
              router.history.back();
              setNavigationBarHidden(false);
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
        <LayoutMain>
          <Outlet />
        </LayoutMain>
        <NavigationBar
          onChange={(evt) => {
            navigate({
              to: evt.target.value,
              replace: true,
            });
          }}
          value={location.pathname}
          style={
            paddingBottom == undefined
              ? undefined
              : { height: 80 + paddingBottom, paddingBottom: paddingBottom }
          }
          hide={!showNavigationBar}
          hidden={navigationBarHidden}
          onHidden={() => setNavigationBarHidden(true)}
        >
          {props.navItems?.map((item, index) => (
            <NavigationBarItem key={index} icon={item.icon} value={item.value}>
              {item.title}
            </NavigationBarItem>
          ))}
        </NavigationBar>
      </Layout>
      <NavigationDrawer></NavigationDrawer>
    </ConfigProvider>
  );
}

export { CustomLayout as Layout };
