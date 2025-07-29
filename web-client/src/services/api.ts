import type { Resp } from "./resp";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default async function <T, TError>(
  apiPath: string,
  method: HttpMethod,
  request?: any
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
  const result = await response.json();
  return result as Resp<T, TError>;
}
