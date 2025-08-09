import type { Resp } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default async function api<T, TError, R = any>(
  apiPath: string,
  method: HttpMethod,
  request?: R,
): Promise<Resp<T, TError>> {
  const url =
    document.location.origin + (apiPath.startsWith("/") ? "" : "/") + apiPath;
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestInfo = (
    method == "GET"
      ? { method: method, headers: headers }
      : {
          method: method,
          body: JSON.stringify(request),
          headers: headers,
        }
  ) as RequestInit;

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

export class SearchParams {
  private params: Map<string, string>;
  constructor(init?: any) {
    this.params = new Map<string, string>();
    if (init) {
      for (const key in init) {
        const valueType = typeof init[key];
        if (valueType != "undefined" && valueType != "function") {
          this.params.set(key, init[key]);
        }
      }
    }
  }

  append(key: string, value: string) {
    this.params[key] = value;
  }

  delete(key: string) {
    return this.params.delete(key);
  }

  toString() {
    var str = "";
    for (const [k, v] of this.params) {
      if (str == "") {
        str = `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
      } else {
        str += `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
      }
    }
    return str;
  }
}

export async function get<T, TError>(
  apiPath: string,
  request?: Record<string, string | undefined>,
): Promise<Resp<T, TError>> {
  const searchParams = new SearchParams(request).toString();
  return await api<T, TError>(
    `${apiPath}${searchParams == "" ? "" : `?${searchParams}`}`,
    "GET",
  );
}
