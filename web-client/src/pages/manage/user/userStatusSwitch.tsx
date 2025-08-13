import { Switch, Typography } from "@douyinfe/semi-ui";
import { USER_STATUS_ENABLE } from "./types";
import { useAuth } from "@/hooks/useAuth";
import { UserEdit } from "@/permissions";

export interface UserStatusSwitchProps {
  status: number;
  onSwitch?: (enable: boolean) => Promise<void> | void;
}

export function UserStatusSwitch(props: UserStatusSwitchProps) {
  const hasEditPermission = useAuth({ permissions: [UserEdit] });

  return (
    <div className="flex items-center">
      <Switch
        disabled={!hasEditPermission}
        checked={props.status == USER_STATUS_ENABLE}
        onChange={(checked) => {
          if (props.onSwitch) {
            props.onSwitch(checked);
          }
        }}
      ></Switch>
      <Typography.Text className="m-l-2">
        {props.status == USER_STATUS_ENABLE ? "已启用" : "已禁用"}
      </Typography.Text>
    </div>
  );
}
