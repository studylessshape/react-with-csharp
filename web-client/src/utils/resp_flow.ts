import { Toast } from "@douyinfe/semi-ui";
import type { Resp } from "../services";

export interface HandleRespProps<T, TError> {
  handleOk: (data: T) => void;
  handleErr?: (error?: TError, message?: string) => void;
  defaultMessage?: string;
  showErrorStatusCode?: boolean;
}

export async function handleResp<T, TError>(
  resp: Promise<Resp<T, TError>>,
  handle: HandleRespProps<T, TError>
) {
  try {
    const res = await resp;
    if (res.success && res.data) {
      handle.handleOk(res.data);
    } else if (handle.handleErr) {
      handle.handleErr(res.error, res.message);
    } else if (res.message || handle.defaultMessage) {
      Toast.error({
        content: `${res.code}: ${res.message ?? handle.defaultMessage}`,
        theme: "light",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
