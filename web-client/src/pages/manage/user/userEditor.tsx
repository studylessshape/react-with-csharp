import { FormModal } from "@/components/FormModal";
import { Form, Typography } from "@douyinfe/semi-ui";
import type { DialogMode } from "../interface";
import type { CreateUserInput, UpdateUserInput, UserDetails } from "@/services";
import { useEffect, useState } from "react";
import { USER_STATUS_ENABLE } from "./types";
import type { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { FormRoleSelect } from "./roleSelect";

export interface UserEditorProps {
  mode: DialogMode;
  user?: UserDetails;
  visible?: boolean;
  onCancel?: () => any;
  onSubmitAdd?: (user: CreateUserInput) => any | Promise<any>;
  onSubmitUpdate?: (user: UpdateUserInput) => any | Promise<any>;
}

export function UserEditor(props: UserEditorProps) {
  const [formApi, setFormApi] = useState(undefined as FormApi | undefined);
  useEffect(() => {
    if (formApi) {
      const status = props.user?.status;
      const initValues = {
        ...props.user,
        status: status == undefined || status == USER_STATUS_ENABLE,
      };
      formApi.setValues(initValues);
    }
  }, [props.user, formApi]);

  return (
    <FormModal
      form={{
        labelPosition: "left",
        getFormApi: setFormApi,
        onSubmit: (v) => {
          if (props.mode == "add" && props.onSubmitAdd) {
            props.onSubmitAdd({
              ...(v as CreateUserInput),
              status: v.status ? USER_STATUS_ENABLE : -1,
            });
          } else if (props.mode == "edit" && props.onSubmitUpdate) {
            props.onSubmitUpdate({
              ...(v as UpdateUserInput),
              status: v.status ? USER_STATUS_ENABLE : -1,
              id: props.user!.id,
            });
          }
        },
      }}
      modal={{ visible: props.visible, onCancel: props.onCancel }}
    >
      <Form.Slot label="Id" className="items-center">
        <Typography.Text>{props.user?.id}</Typography.Text>
      </Form.Slot>
      <Form.Input
        label="账户"
        field="account"
        rules={[
          {
            required: props.mode == "add",
            min: 3,
            message: "账户长度至少为 3",
          },
        ]}
      ></Form.Input>
      <Form.Input
        label="用户代码"
        field="code"
        rules={[{ required: props.mode == "add" }]}
      ></Form.Input>
      <Form.Input
        label="密码"
        field="password"
        mode="password"
        rules={[
          {
            required: props.mode == "add",
            min: 6,
            message: "密码长度至少为 6",
          },
        ]}
      ></Form.Input>
      <Form.Input label="名称" field="name"></Form.Input>
      <Form.Input
        label="邮箱"
        field="email"
        type="email"
        rules={[{ type: "email" }]}
      ></Form.Input>
      {props.mode == "add" ? (
        <FormRoleSelect
          label="角色"
          field="role"
          showClear
          className="flex"
          rules={[{ required: props.mode == "add" }]}
        ></FormRoleSelect>
      ) : undefined}
      <Form.Switch label="是否启用" field="status"></Form.Switch>
      <Form.Input label="备注" field="remark"></Form.Input>
    </FormModal>
  );
}
