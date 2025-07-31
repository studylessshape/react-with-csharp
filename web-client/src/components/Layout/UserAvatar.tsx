import { IconExit, IconUser } from "@douyinfe/semi-icons";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { useUserState } from "../../stores";

type DropdownPosition = typeof Dropdown.prototype.props.position;

export interface UserAvatarProps {
  dropdownPosition?: DropdownPosition;
}

export function UserAvatar(props: UserAvatarProps) {
  const user = useUserState((state) => state.user);

  return (
    <Dropdown
      position={props.dropdownPosition ?? "bottomRight"}
      render={
        <Dropdown.Menu>
          <Dropdown.Title>用户: {user?.name}</Dropdown.Title>
          <Dropdown.Item>
            <IconUser />
            个人中心
          </Dropdown.Item>
          <Dropdown.Item>
            <IconExit />
            登出
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Avatar size="small">{user?.name}</Avatar>
    </Dropdown>
  );
}
