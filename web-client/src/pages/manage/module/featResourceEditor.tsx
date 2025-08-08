import type { FeatResource, FeatResourceDetail } from "@/services";
import type { DialogFrom, DialogMode } from "./types";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { featResourceToTreeData } from "@/utils/feats_to_tree";
import { useEffect, useState } from "react";
import { Col, Form, Row, Typography } from "@douyinfe/semi-ui";
import { FormModal } from "@/components/FormModal";
import { FormIconSelect } from "@/components/CustomFormItem";
import type { FormApi } from "@douyinfe/semi-ui/lib/es/form";

export function FeatResourceEditor({
  mode,
  from,
  feat,
  parentId,
  datas,
  onSubmit,
  visible,
  onCancel,
}: {
  mode: DialogMode;
  from: DialogFrom;
  feat: FeatResource | undefined;
  parentId?: number;
  datas?: FeatResource[];
  onSubmit: (values: FeatResource) => void;
  visible?: boolean;
  onCancel?: () => void;
}) {
  const title = `${mode == "add" ? "添加" : "编辑"} - ${from == "menu" ? "菜单" : "许可"}`;
  const treeDataProps: TreeNodeData[] | undefined = featResourceToTreeData(
    datas,
    mode == "add" ? undefined : (data) => data.id == feat?.id
  );
  const initValues =
    mode == "add"
      ? {
          parentId: feat?.parentId?.toString() ?? parentId?.toString() ?? "1",
          order: 0,
        }
      : {
          ...feat,
          parentId: feat?.parentId?.toString() ?? parentId?.toString(),
        };
  const [formApi, setFormApi] = useState(undefined as FormApi | undefined);

  useEffect(() => {
    if (visible && formApi) {
      formApi.setValues(initValues, { isOverride: true });
    }
  }, [visible, formApi, feat, parentId]);

  return (
    <FormModal
      form={{
        labelPosition: "left",
        labelCol: { span: 4 },
        onSubmit: (values) => {
          const { parentId, ...valuesOther } = values;
          const detail = {
            parentId: parentId != undefined ? parseInt(parentId) : undefined,
            ...valuesOther,
          } as FeatResourceDetail;
          const value = { id: feat?.id, kind: 0, ...detail } as FeatResource;
          onSubmit(value);
        },
        getFormApi: (api) => setFormApi(api),
      }}
      modal={{
        title: title,
        onCancel: onCancel,
        visible: visible,
        keepDOM: true,
      }}
    >
      <Form.Slot label="Id">
        <Typography.Text className="h-full flex items-center">
          {mode == "add" ? undefined : feat?.id}
        </Typography.Text>
      </Form.Slot>
      <Form.Input
        label="唯一名称"
        field="name"
        rules={[{ required: true, message: "代号不可为空" }]}
      ></Form.Input>
      <Row gutter={8}>
        <Col span={from == "menu" ? 12 : 24}>
          <Form.Input label="描述" field="description"></Form.Input>
        </Col>
        {from == "permission" ? undefined : (
          <Col span={12}>
            <Form.Input label="地址" field="url"></Form.Input>
          </Col>
        )}
      </Row>
      {from == "permission" ? undefined : (
        <>
          <Row gutter={8}>
            <Col span={initValues.parentId ? 12 : undefined}>
              <FormIconSelect
                label="图标"
                field="icon"
                showClear
                maxWidth={140}
              />
            </Col>
            {initValues.parentId ? (
              <Col span={12}>
                <Form.TreeSelect
                  label="父级"
                  field="parentId"
                  disableStrictly
                  treeData={treeDataProps}
                  rules={[{ required: true }]}
                  style={{ maxWidth: 140 }}
                ></Form.TreeSelect>
              </Col>
            ) : undefined}
          </Row>
          <Form.InputNumber
            label="排序"
            field="order"
            required
          ></Form.InputNumber>
        </>
      )}
    </FormModal>
  );
}
