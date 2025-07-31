import type { NavHeaderProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { Nav } from "@douyinfe/semi-ui";
import {
  useLocation,
  useNavigate,
  type ParsedLocation,
} from "@tanstack/react-router";

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

export interface NavbarProps {
  header?: React.ReactNode | NavHeaderProps;
  menu?: MenuItemProps[];
}

const NavSub = Nav.Sub;
const NavItem = Nav.Item;

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

export function Navbar(props: NavbarProps) {
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
            onClick={() => navigate({ to: m.path })}
          />
        );
      }
    });
  }

  const menus = props.menu ? toNav(props.menu) : undefined;
  const selectedKeys = getSelectedKeys(location, props.menu);

  return (
    <Nav
      className="h-full"
      defaultSelectedKeys={selectedKeys}
      header={props.header}
      footer={{ collapseButton: true }}
    >
      {menus}
    </Nav>
  );
}
