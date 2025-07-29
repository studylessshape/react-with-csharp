import { getCookie, setCookie } from "typescript-cookie";

export function useAuth() {
  var isLogin = false;
  if (
    setCookie(import.meta.env.PUBLIC_AUTH_COOKIE, "login") &&
    getCookie(import.meta.env.PUBLIC_AUTH_COOKIE) != "login"
  ) {
    isLogin = true;
  } else {
    isLogin = false;
  }
  setCookie(import.meta.env.PUBLIC_AUTH_COOKIE, undefined);
  return isLogin;
}
