import { IconExit, IconUser } from "@douyinfe/semi-icons";
import { Avatar, Dropdown, Toast } from "@douyinfe/semi-ui";
import { useUserState } from "../../stores";
import { logout } from "../../services";
import { handleResp } from "../../utils/resp_flow";
import { useNavigate } from "@tanstack/react-router";

type DropdownPosition = typeof Dropdown.prototype.props.position;

export interface UserAvatarProps {
  dropdownPosition?: DropdownPosition;
}

export function UserAvatar(props: UserAvatarProps) {
  const user = useUserState((state) => state.user);
  const removeUserState = useUserState((state) => state.logout);
  const navigate = useNavigate();

  function onLogoutClick() {
    handleResp(logout(), {
      handleOk: () => Toast.success("登出成功！"),
      defaultMessage: "已从网页移除登录状态，但接受到服务器的失败响应",
    }).finally(() => removeUserState());
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
