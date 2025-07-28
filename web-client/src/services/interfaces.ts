export interface LoginRequest {
    account: string,
    password: string,
}

export interface UserProfile {
    account: string,
    code: string,
    name: string,
    email?: string,
    phoneNum?: string,
    sex: number,
    status: number,
    remark?: string,
}

export type ResError = string | { [key: string]: [[string]]}