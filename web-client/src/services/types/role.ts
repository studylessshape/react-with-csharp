export interface RoleDetail {
  role: string;
}

export interface AssignResourceRequest {
  roleId: number;
  featResourceIds: number[];
}
