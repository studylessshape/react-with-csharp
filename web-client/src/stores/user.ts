import { create } from "zustand";

interface UserInfo {
  account: string;
}

interface UserState {
  user?: UserInfo;
  login: (user: UserInfo) => void;
  logout: () => void;
}

export const useUserState = create<UserState>((set) => ({
  user: undefined,
  login: (user) => set({ user: user }),
  logout: () => set({ user: undefined }),
}));
