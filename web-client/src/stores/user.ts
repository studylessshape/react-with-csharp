import { create } from "zustand";
import type { UserProfile } from "../services/interfaces";

export interface UserInfo extends UserProfile {}

interface UserState {
  user?: UserInfo;
  login: (user: UserInfo) => void;
  logout: () => void;
}

const STORE_KEY = "user_info";

const userInfoFromLocalStorage = localStorage.getItem(STORE_KEY);

function userInfoFromJson(json: string | null) {
  if (json) {
    return JSON.parse(json) as UserInfo;
  }
  return undefined;
}

export const useUserState = create<UserState>((set) => ({
  user: userInfoFromJson(userInfoFromLocalStorage),
  login: (user) => {
    localStorage.setItem(STORE_KEY, JSON.stringify(user));
    set({ user: user });
  },
  logout: () => {
    localStorage.removeItem(STORE_KEY);
    set({ user: undefined });
  },
}));
