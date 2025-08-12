import api from "./api";
import type {
  None,
  LoginRequest,
  NormalError,
  UserState,
  FeatResource,
} from "./types";

export function login(request: LoginRequest) {
  return api<UserState, NormalError>("/api/auth/Login", "POST", request);
}

export function logout() {
  return api<None, NormalError>("/api/auth/Logout", "POST");
}

export function getLoginState() {
  return api<UserState, NormalError>("/api/auth/GetLoginState", "GET");
}

export function getAccessResources() {
  return api<FeatResource[], NormalError>("/api/auth/GetAccessResources", "GET");
}
