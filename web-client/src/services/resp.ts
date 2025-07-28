export interface Resp<T, TError> {
    code: number,
    success: boolean,
    message?: string,
    data?: T,
    error?: TError
}