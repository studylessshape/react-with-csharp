export interface LoginRequest {
  account: string;
  password: string;
}

export interface UserProfile {
  account: string;
  code: string;
  name: string;
  email?: string;
  phoneNum?: string;
  sex: number;
  status: number;
  remark?: string;
}

export type NormalError = string | { [key: string]: [[string]] };
export type ResError<T = any> = T | NormalError;
export type None = {} | undefined | null;

export interface FeatResource {
  id: number,
  name: string,
  description: string,
  parentId?: number,
  /**
   * @summary 为 `0` 时是菜单，为 `1` 时是按钮
   */
  kind: number,
  tag: string,
  url: string,
  order: number,
  icon?: string,
}
