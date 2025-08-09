export type ModeStateError = { [key: string]: [[string]] };
export type NormalError = string | ModeStateError;
export type ResError<T = any> = T | NormalError;
export type None = {} | undefined | null;
export interface PagedListProps {
  total: number;
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface PagedList<T> extends PagedListProps {
  content: T[];
}

export interface LoginRequest {
  account: string;
  password: string;
}

export interface UserState {
  account: string;
  code: string;
  name: string;
  email?: string;
  phoneNum?: string;
  sex: number;
  status: number;
  remark?: string;
  permissions: string[];
  roles: string[];
}

export interface FeatResourceDetail {
  name: string;
  description?: string;
  parentId?: number;
  tag: string;
  url: string;
  order: number;
  icon?: string;
}

export interface FeatResource extends FeatResourceDetail {
  id: number;
  /**
   * @summary 为 `0` 时是菜单，为 `1` 时是按钮
   */
  kind: number;
}
