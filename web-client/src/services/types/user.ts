export interface CreateUserInput {
  account: string;
  password: string;
  name?: string;
  code: string;
  email?: string;
  phoneNum?: string;
  remark?: string;
  sex: number;
  status: number;
}

export interface UpdateUserInput {
  id: string;
  account?: string;
  password?: string;
  name?: string;
  code: string;
  email?: string;
  phoneNum?: string;
  remark?: string;
  sex?: number;
  status?: number;
}

export interface UserDetails extends CreateUserInput {
  id: string;
  name: string;
}
