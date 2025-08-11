import api, { get } from "./api";
import type {
  NormalError,
  ClaimEntity,
  PagedList,
  RoleDetail,
  None,
  AssignResourceRequest,
} from "./types";

export function getRoles(page: number, pageSize: number) {
  return get<PagedList<ClaimEntity>, NormalError>("/api/Role/GetRoles", {
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
}

export function createRole(detail: RoleDetail) {
  return api<ClaimEntity, NormalError>("/api/Role/CreateRole", "PUT", detail);
}

export function updateRole(entity: ClaimEntity) {
  return api<None, NormalError>("/api/Role/UpdateRole", "POST", entity);
}

export function deleteRoles(ids: number[]) {
  return api<None, NormalError>("/api/Role/DeleteRoles", "DELETE", ids);
}

export function assignResources(req: AssignResourceRequest) {
  return api<None, NormalError>("/api/Role/AssignResources", "POST", req);
}
