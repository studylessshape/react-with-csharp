import { IconExit, IconUser } from "@douyinfe/semi-icons";
import { Avatar, Dropdown, Toast } from "@douyinfe/semi-ui";
import { useMenus, useUserState } from "../../stores";
import { useNavigate } from "@tanstack/react-router";

type DropdownPosition = typeof Dropdown.prototype.props.position;

export interface UserAvatarProps {
  dropdownPosition?: DropdownPosition;
}

export function UserAvatar(props: UserAvatarProps) {
  const user = useUserState((state) => state.user);
  const logout = useUserState((state) => state.logout);
  const setMenus = useMenus((state) => state.setMenus);
  const navigate = useNavigate();

  function onLogoutClick() {
    logout(() => Toast.success("登出成功！")).finally(() =>
      setMenus(undefined)
    );
  }

  function onUserCenterClick() {
    if (user) {
      navigate({ to: `/user/${user.account}` });
    }
  }

  return (
    <>
      <Dropdown
        position={props.dropdownPosition ?? "bottomRight"}
        render={
          <Dropdown.Menu>
            <Dropdown.Title>用户: {user?.name}</Dropdown.Title>
            <Dropdown.Item onClick={onUserCenterClick}>
              <IconUser />
              个人中心
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogoutClick}>
              <IconExit />
              登出
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Avatar size="small">{user?.name}</Avatar>
      </Dropdown>
    </>
  );
}
