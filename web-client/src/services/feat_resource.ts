import api from "./api";
import type {
  FeatResource,
  FeatResourceDetail,
  None,
  NormalError,
} from "./interfaces";

export function getMenus() {
  return api<FeatResource[], NormalError>(
    "/api/auth/FeatResource/GetMenus",
    "GET"
  );
}

export function getPermissions() {
  return api<FeatResource[], NormalError>(
    "/api/auth/FeatResource/GetPermissions",
    "GET"
  );
}

export function getPermissionsBelongMenu(menuId: number) {
  return api<FeatResource[], NormalError>(
    `/api/auth/FeatResource/GetPermissionsBelongMenu?menuId=${menuId}`,
    "GET"
  );
}

export function createMenu(detail: FeatResourceDetail) {
  return api<FeatResource, NormalError>(
    "/api/auth/FeatResource/CreateMenu",
    "PUT",
    detail
  );
}

export function createPermission(detail: FeatResourceDetail) {
  return api<FeatResource, NormalError>(
    "/api/auth/FeatResource/CreatePermission",
    "PUT",
    detail
  );
}

export function deleteResource(id: number) {
  return api<None, NormalError>(
    `/api/auth/FeatResource/DeleteResource?id=${id}`,
    "DELETE"
  );
}

export function deleteManyResource(ids: number[]) {
  return api<None, NormalError>(
    `/api/auth/FeatResource/DeleteManyResource`,
    "DELETE",
    ids
  );
}

export function updateMenu(menu: FeatResource) {
  return api<None, NormalError>(
    `/api/auth/FeatResource/UpdateMenu`,
    "POST",
    menu
  );
}
