import { Toast } from "@douyinfe/semi-ui";
import type { Resp } from "../services";

type HandleOkHandler<T> = (data: T) => any;
type HandleOkAsyncHandler<T> = (data: T) => Promise<any>;
type HandleErrHandler<TError> = (error?: TError, message?: string) => any;
type HandleErrAsyncHandler<TError> = (
  error?: TError,
  message?: string
) => Promise<any>;

export interface HandleRespProps<T, TError> {
  handleOk: HandleOkHandler<T> | HandleOkAsyncHandler<T>;
  handleErr?: HandleErrHandler<TError> | HandleErrAsyncHandler<TError>;
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
      await Promise.resolve(handle.handleOk(res.data));
    } else if (handle.handleErr) {
      await Promise.resolve(handle.handleErr(res.error, res.message));
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
