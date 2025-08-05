import { create } from "zustand";
import type {
  NormalError,
  UserState as ServiceUserState,
} from "../services/interfaces";
import {
  getLoginState,
  login as loginApi,
  logout as logoutApi,
} from "../services";
import {
  getCookie,
  hasCookie,
  removeCookie,
  setCookie,
} from "../utils/doc_cookie";
import type { HandleErrHandler } from "../utils/resp_flow";

export interface UserState {
  isAuthenticated: boolean;
  user?: ServiceUserState;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAllPermissions: (permission: string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  login: (
    account: string,
    password: string,
    handleOk: () => void,
    handleErr: HandleErrHandler<NormalError>
  ) => Promise<void>;
  getLoginState: (handleErr: HandleErrHandler<NormalError>) => Promise<void>;
  logout: (
    handleOk?: () => void,
    handleErr?: HandleErrHandler<NormalError>
  ) => Promise<void>;
}

function isAuthenticatedCookie() {
  const COOKIE = import.meta.env.PUBLIC_AUTH_COOKIE;
  var result = hasCookie(COOKIE);

  if (!result) {
    setCookie(COOKIE, COOKIE, undefined, undefined, undefined, true);

    if (!getCookie(COOKIE)) {
      result = true;
    }
    removeCookie(COOKIE);
  }
  return result;
}

export const useUserState = create<UserState>((set, store) => ({
  user: undefined,
  isAuthenticated: isAuthenticatedCookie(),
  async login(
    account,
    password,
    handleOk: () => void,
    handleErr: HandleErrHandler<NormalError>
  ) {
    const response = await loginApi({ account: account, password: password });
    if (response.success && response.data) {
      set({ user: response.data, isAuthenticated: true });
      handleOk();
    } else {
      handleErr(response.code, response.error, response.message);
    }
  },
  async getLoginState(handleErr: HandleErrHandler<NormalError>) {
    const response = await getLoginState();

    if (response.success && response.data) {
      set({ user: response.data, isAuthenticated: true });
    } else {
      handleErr(response.code, response.error, response.message);
    }
  },
  async logout(handleOk, handleErr) {
    try {
      const response = await logoutApi();
      if (response.success) {
        if (handleOk) handleOk();
      } else {
        if (handleErr)
          handleErr(response.code, response.error, response.message);
      }
    } finally {
      set({ user: undefined, isAuthenticated: false });
    }
  },
  hasRole(role) {
    const user = store().user;
    if (!user) return false;

    return user.roles.some((r) => r == role);
  },
  hasAnyRole(roles) {
    const user = store().user;
    if (!user) return false;

    return roles.some((r) => user.roles.some((ur) => ur == r));
  },
  hasPermission(permission) {
    const user = store().user;
    if (!user) return false;

    return user.permissions.some((p) => p == permission);
  },
  hasAllPermissions(permissions) {
    const user = store().user;
    if (!user) return false;

    return permissions.some((p) => !user.permissions.some((up) => up == p));
  },
  hasAnyPermission(permissions) {
    const user = store().user;
    if (!user) return false;

    return permissions.some((p) => user.permissions.some((up) => up == p));
  },
}));
