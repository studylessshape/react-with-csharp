import type { FeatResource, FeatResourceDetail } from "@/services";
import type { DialogMode } from "./types";
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree";
import { featResourceToTreeData } from "@/utils/feats_to_tree";
import { useEffect, useRef, useState } from "react";
import { Col, Form, Row, Typography } from "@douyinfe/semi-ui";
import { FormModal } from "@/components/FormModal";
import { FormIconSelect } from "@/components/CustomFormItem";
import type { FormApi } from "@douyinfe/semi-ui/lib/es/form";

export function MenuEditor({
  mode,
  menu,
  datas,
  onSubmit,
  visible,
  onCancel,
}: {
  mode: DialogMode;
  menu: FeatResource | undefined;
  datas: FeatResource[] | undefined;
  onSubmit: (values: FeatResource) => void;
  visible?: boolean;
  onCancel?: () => void;
}) {
  const title = `${mode == "add" ? "添加" : "编辑"} - 菜单`;
  const treeDataProps: TreeNodeData[] | undefined = featResourceToTreeData(
    datas,
    mode == "add" ? undefined : (data) => data.id == menu?.id
  );
  const initValues =
    mode == "add"
      ? { parentId: menu?.id.toString() ?? "1", order: 0 }
      : {
          ...menu,
          parentId: menu?.parentId?.toString(),
        };
  const [formApi, setFormApi] = useState(undefined as FormApi | undefined);

  useEffect(() => {
    if (visible && formApi) {
      formApi.setValues(initValues);
    }
  }, [visible, formApi]);

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
          const value = { id: menu?.id, kind: 0, ...detail } as FeatResource;
          onSubmit(value);
        },
        getFormApi: setFormApi,
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
          {mode == "add" ? undefined : menu?.id}
        </Typography.Text>
      </Form.Slot>
      <Form.Input
        label="代号"
        field="name"
        rules={[{ required: true, message: "代号不可为空" }]}
      ></Form.Input>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Input label="描述" field="description"></Form.Input>
        </Col>
        <Col span={12}>
          <Form.Input label="地址" field="url"></Form.Input>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={initValues.parentId ? 12 : undefined}>
          <FormIconSelect label="图标" field="icon" showClear maxWidth={140} />
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
      <Form.InputNumber label="排序" field="order" required></Form.InputNumber>
    </FormModal>
  );
}
