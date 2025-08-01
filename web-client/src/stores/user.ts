import { create } from "zustand";
import type { UserProfile } from "../services/interfaces";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

export interface UserInfo extends UserProfile {
  routes?: string[];
  permissions?: string[];
}

interface UserState {
  isAuthenticated: boolean;
  user?: UserInfo;
  login: (user: UserInfo) => void;
  logout: () => void;
}

function isAuthenticatedCookie() {
  const COOKIE = import.meta.env.PUBLIC_AUTH_COOKIE;
  var result = false;
  if (getCookie(COOKIE) || (setCookie(COOKIE, COOKIE) && !getCookie(COOKIE))) {
    result = true;
  }
  removeCookie(COOKIE);
  return result;
}

export const useUserState = create<UserState>((set) => ({
  user: undefined,
  isAuthenticated: isAuthenticatedCookie(),
  login: (user) => set({ user: user, isAuthenticated: true }),
  logout: () => set({ user: undefined, isAuthenticated: false }),
}));
