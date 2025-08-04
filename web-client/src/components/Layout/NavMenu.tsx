import type { NavHeaderProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { Nav } from "@douyinfe/semi-ui";
import {
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

export interface AutoCollapsedProps {
  /**
   * @summary auto set sidebar collapsed when window width is less than this value
   */
  minWidth?: number;
  /**
   * @summary auto set sidebar collasped when `window.width/window.height` is less than this value
   */
  radio?: number;
  /**
   * @summary whether expand sidebar when width or radio is larger than target
   * @default false
   */
  expand?: boolean;
}

export interface NavMenuProps {
  header?: React.ReactNode | NavHeaderProps;
  menu?: MenuItemProps[];
  autoCollapsed?: AutoCollapsedProps;
  className?: string;
}

const NavSub = Nav.Sub;
const NavItem = Nav.Item;

function getSelectedKeys(location: ParsedLocation<{}>, menu?: MenuItemProps[]) {
  var keys = [] as (string | number)[];
  if (menu) {
    keys.push(
      ...menu.filter((m) => m.path == location.pathname).map((m) => m.key),
    );
    menu
      .filter((m) => m.children && m.children.length > 0)
      .forEach((m) => {
        keys.push(...getSelectedKeys(location, m.children));
      });
  }
  return keys;
}

export function NavMenu(props: NavMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
            onClick={() => {
              if (m.path.trim() != "") {
                navigate({ to: m.path });
              }
            }}
          />
        );
      }
    });
  }

  const menus = props.menu ? toNav(props.menu) : undefined;
  const selectedKeys = getSelectedKeys(location, props.menu);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function onWindowResize(this: Window, _ev: UIEvent) {
    handleWindowSize(this);
  }

  function handleWindowSize(win: Window) {
    if (props.autoCollapsed) {
      const minWidth = props.autoCollapsed.minWidth;
      const radio = props.autoCollapsed.radio;
      const currentRadio = win.innerWidth / win.innerHeight;
      if (
        (minWidth && win.innerWidth < minWidth) ||
        (radio && currentRadio < radio)
      ) {
        setIsCollapsed(true);
      }
    }
  }

  useEffect(() => {
    if (props.autoCollapsed) {
      window.addEventListener("resize", onWindowResize);
      // ensure size when initialize component
      handleWindowSize(window);
      return () => {
        window.removeEventListener("resize", onWindowResize);
      };
    }
  }, []);

  return (
    <Nav
      className={`flex-1 overflow-y-auto p-r-0 ${props.className}`}
      defaultSelectedKeys={selectedKeys}
      header={props.header}
      isCollapsed={isCollapsed}
      footer={{ collapseButton: true }}
      onCollapseChange={(collapsed) => setIsCollapsed(collapsed)}
    >
      {menus}
    </Nav>
  );
}
