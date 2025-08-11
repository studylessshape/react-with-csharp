import { IconExit, IconUser } from "@douyinfe/semi-icons";
import { Avatar, Card, Dropdown, Toast, Typography } from "@douyinfe/semi-ui";
import { useMenuState, useUserState } from "../../stores";
import { useNavigate } from "@tanstack/react-router";

type DropdownPosition = typeof Dropdown.prototype.props.position;

export interface UserAvatarProps {
  dropdownPosition?: DropdownPosition;
}

export function UserAvatar(props: UserAvatarProps) {
  const user = useUserState((state) => state.user);
  const logout = useUserState((state) => state.logout);
  const setMenus = useMenuState((state) => state.setMenus);
  const navigate = useNavigate();

  function onLogoutClick() {
    logout(() => Toast.success("登出成功！")).finally(() => {
      setMenus(undefined);
    });
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
            <Dropdown.Title>
              <div className="flex items-center">
                <Avatar size="default">{user?.name}</Avatar>
                <div className="m-l-2">
                  <Typography.Text className="font-bold">{user?.name}</Typography.Text>
                  <div>Account: {user?.account}</div>
                </div>
              </div>
            </Dropdown.Title>
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
