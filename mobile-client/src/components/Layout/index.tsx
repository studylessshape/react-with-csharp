import { RoutePath } from "@/types";
import {
  Layout,
  TopAppBar,
  TopAppBarTitle,
  LayoutMain,
  NavigationBar,
  NavigationBarItem,
  ButtonIcon,
} from "@less/mdui-react";
import {
  Outlet,
  useCanGoBack,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { platform } from "@tauri-apps/plugin-os";
import { ReactNode, useEffect, useState } from "react";

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

  const os = platform();
  const isMobile = os == "android" || os == "ios";
  const paddingTop = isMobile ? 36 : undefined;
  const paddingBottom = isMobile ? 20 : undefined;
  const showNavigationBar =
    props.navItems &&
    props.navItems.some((item) => item.value == location.pathname);

  return (
    <Layout
      className="w-screen h-screen relative overflow-hidden"
      style={navigationBarHidden ? { paddingBottom: paddingBottom } : undefined}
    >
      <TopAppBar
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
        {props.navItems?.map((item) => (
          <NavigationBarItem icon={item.icon} value={item.value}>
            {item.title}
          </NavigationBarItem>
        ))}
      </NavigationBar>
    </Layout>
  );
}

export { CustomLayout as Layout };
