import api from "./api";
import type {
  FeatResource,
  FeatResourceDetail,
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
  return api<FeatResource, NormalError>(
    `/api/auth/FeatResource/DeleteResource?id=${id}`,
    "DELETE"
  );
}
