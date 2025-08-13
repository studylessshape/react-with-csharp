export interface CreateUserInput {
  accout: string;
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
  accout: string;
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
