import type { BaseFormProps, FormApi } from "@douyinfe/semi-ui/lib/es/form";
import type { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import Modal from "@douyinfe/semi-ui/lib/es/modal";
import React from "react";
import { Form } from "@douyinfe/semi-ui";

export interface FormModalProps {
  /**
   * `chidlren` will not efficient
   */
  form?: BaseFormProps;
  /**
   * `onOk` will not efficient. Use `form.onSubmit` to replace
   */
  modal?: ModalReactProps;
}

class FormModalContext {
  modalProps?: any;
  formProps?: any;
  getFormApiFromProps?: (formApi: FormApi<Record<string, any>>) => void;
  children?: React.ReactNode;
  formApi?: FormApi<Record<string, any>>;
  constructor(props: React.PropsWithChildren<FormModalProps>) {
    const { form, modal, children } = props;

    if (form) {
      const { getFormApi, children, ...formProps } = form;
      this.getFormApiFromProps = getFormApi;
      this.formProps = formProps;
    }
    if (modal) {
      const { children, onOk, ...modalProps } = modal;
      this.modalProps = modalProps;
    }
    this.children = children;
  }

  getFormApi(api: FormApi<Record<string, any>>) {
    this.formApi = api;
  }

  async handleOk() {
    if (this.formApi) {
      this.formApi.submitForm();
    }
  }
}

export function FormModal(props: React.PropsWithChildren<FormModalProps>) {
  const context = new FormModalContext(props);
  return (
    <Modal
      {...context.modalProps}
      onOk={async () => {
        await context.handleOk();
      }}
    >
      <Form
        {...context.formProps}
        getFormApi={(api) => {
          context.getFormApi(api);
          if (context.getFormApiFromProps) context.getFormApiFromProps(api);
        }}
      >
        {context.children}
      </Form>
    </Modal>
  );
}
