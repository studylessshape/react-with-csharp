import api, { get } from "./api";
import type {
  PagedList,
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

export function getMenuPermissions(
  page: number,
  pageSize: number,
  menuId?: number
) {
  return get<PagedList<FeatResource>, NormalError>(
    "/api/auth/FeatResource/GetMenuPermissions",
    {
      page: page.toString(),
      pageSize: pageSize.toString(),
      menuId: menuId ? menuId.toString() : undefined,
    }
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
  return api<number, NormalError>(
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

export function updatePermission(permission: FeatResource) {
  return api<None, NormalError>(
    `/api/auth/FeatResource/UpdatePermission`,
    "POST",
    permission
  );
}
