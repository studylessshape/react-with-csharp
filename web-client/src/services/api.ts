import type { Resp } from "./resp";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ApiOption {
  /**
   * @summary If set request to query parameters
   * @default true
   */
  query: boolean;

  constructor(query?: boolean) {
    this.query = query ?? false;
  }
}

export default async function <T, TError, R = any>(
  apiPath: string,
  method: HttpMethod,
  request?: R,
  option?: ApiOption,
) {
  const url =
    document.location.origin + (apiPath.startsWith("/") ? "" : "/") + apiPath;

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestInfo = {
    method: method,
    body: JSON.stringify(request),
    headers: headers,
  } as RequestInit;

  const response = await fetch(url, requestInfo);

  try {
    const result = await response.json();
    return result as Resp<T, TError>;
  } catch {
    return {
      code: response.status,
      message: response.statusText,
    } as Resp<T, TError>;
  }
}
