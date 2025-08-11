import { FormModal } from "@/components/FormModal";
import type { DialogMode } from "../interface";
import type { ClaimEntity } from "@/services";
import { Form, Typography } from "@douyinfe/semi-ui";
import { useEffect, useMemo, useState } from "react";
import type { FormApi } from "@douyinfe/semi-ui/lib/es/form";

export interface RoleEditorProps {
  visible?: boolean;
  onCancel?: () => void;
  onSubmit?: (entity: ClaimEntity) => Promise<void> | void;
  mode?: DialogMode;
  entity?: ClaimEntity;
}

export function RoleEditor(props: RoleEditorProps) {
  if (!props.mode) {
    return undefined;
  }

  const title = useMemo(
    () => `${props.mode == "add" ? "添加" : "编辑"} - 角色`,
    [props.mode]
  );
  const [formApi, setFormApi] = useState(undefined as FormApi | undefined);

  useEffect(() => {
    if (formApi) {
      const initValues = props.entity ?? {
        claimValue: "",
      };
      formApi.setValues(initValues);
    }
  }, [props.visible]);

  return (
    <FormModal
      form={{
        onSubmit: (values) => {
          if (props.onSubmit) {
            const entity = values as ClaimEntity;
            props.onSubmit(entity);
          }
        },
        getFormApi: setFormApi,
        labelPosition: "left",
      }}
      modal={{
        visible: props.visible,
        title: title,
        onCancel: () => {
          if (props.onCancel) {
            props.onCancel();
          }
        },
        keepDOM: true,
      }}
    >
      <Form.Slot label="Id">
        <Typography.Text>{props.entity?.id}</Typography.Text>
      </Form.Slot>
      <Form.Input
        label="Role"
        field="claimValue"
        rules={[{ required: true }]}
      ></Form.Input>
    </FormModal>
  );
}
