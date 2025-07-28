import type { Resp } from "./resp";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default async function<T, TError>(apiPath: string, method: HttpMethod, request?: any) {
    const url = document.location.origin + apiPath.startsWith('/') ? "" : "/" + apiPath;
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json")

    var requestInfo = {
        method: method,
        body: request,
        headers: headers,
    } as RequestInit;

    const response = await fetch(url, requestInfo);
    const res = await response.json();
    return res as Resp<T, TError>;
}