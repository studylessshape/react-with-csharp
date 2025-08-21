import { Switch, Typography } from "@douyinfe/semi-ui";
import { USER_STATUS_ENABLE } from "./types";
import { useAuth } from "@/hooks/useAuth";
import { UserEdit } from "@/permissions";
import { act, useEffect, useState } from "react";
import type { None, NormalError, Resp } from "@/services";

export interface UserStatusSwitchProps {
  status: number;
  account: string;
  onSwitch?: (account: string, enable: boolean) => Promise<any> | any;
}

export function UserStatusSwitch(props: UserStatusSwitchProps) {
  const hasEditPermission = useAuth({ permissions: [UserEdit] });
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(props.status == USER_STATUS_ENABLE);

  useEffect(() => {
    setEnabled(props.status == USER_STATUS_ENABLE);
  }, [props.status]);

  return (
    <div className="flex items-center">
      <Switch
        disabled={!hasEditPermission}
        loading={loading}
        checked={enabled}
        onChange={(checked) => {
          if (props.onSwitch) {
            setLoading(true);
            try {
              var res = props.onSwitch(props.account, checked);
              if (res instanceof Promise) {
                res
                  .then((v) => {
                    var res = v as Resp<None, NormalError>;
                    if (res && res.success) {
                      setEnabled(checked);
                    }
                  })
                  .finally(() => setLoading(false));
              } else {
                setEnabled(checked);
              }
            } finally {
              setLoading(false);
            }
          }
        }}
      ></Switch>
      <Typography.Text className="m-l-2">
        {enabled ? "已启用" : "已禁用"}
      </Typography.Text>
    </div>
  );
}
