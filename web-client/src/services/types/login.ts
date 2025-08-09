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
