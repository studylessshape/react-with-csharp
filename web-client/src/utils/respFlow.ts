import { Toast } from "@douyinfe/semi-ui";
import type { Resp } from "../services";

export type HandleOkHandler<T> = (data: T) => any;
export type HandleOkAsyncHandler<T> = (data: T) => Promise<any>;
export type HandleErrHandler<TError> = (
  code: number,
  error?: TError,
  message?: string
) => any;
export type HandleErrAsyncHandler<TError> = (
  code: number,
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
      await Promise.resolve(handle.handleErr(res.code, res.error, res.message));
    } else if (res.message || handle.defaultMessage) {
      Toast.error({
        content: `${res.code}: ${res.message ?? handle.defaultMessage}`,
      });
    }
    return res;
  } catch (err) {
    console.log(err);
  }
}
