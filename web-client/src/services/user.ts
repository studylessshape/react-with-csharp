import api, { get } from "./api";
import type {
  NormalError,
  None,
  UserDetails,
  CreateUserInput,
  UpdateUserInput,
  PagedList,
} from "./types";

export function changeUserState(account: string, enable: boolean) {
  return get<None, NormalError>(`/api/auth/User/ChangeUserState/${account}`, {
    enable: enable.toString(),
  });
}

export function createUser(input: CreateUserInput) {
  return api<UserDetails, NormalError>(
    "/api/auth/User/CreateUser",
    "PUT",
    input
  );
}

export function updateUser(input: UpdateUserInput) {
  return api<UserDetails, NormalError>(
    "/api/auth/User/UpdateUser",
    "POST",
    input
  );
}

export function getUsers(page: number, pageSize: number) {
  return get<PagedList<UserDetails>, NormalError>("/api/auth/User/GetUsers", {
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
}

export function deleteUserById(id: string) {
  return api<None, NormalError>(`/api/auth/User/DeleteUser?id=${id}`, "DELETE");
}

export function deleteUserByAccount(account: string) {
  return api<None, NormalError>(
    `/api/auth/User/DeleteUser?account=${account}`,
    "DELETE"
  );
}
