import { create } from "zustand";
import type { FeatResource } from "@/services";

export interface MenuResourceState {
  menus?: FeatResource[];
  setMenus: (menus?: FeatResource[]) => void;
}

export const useMenuState = create<MenuResourceState>((set) => ({
  menus: undefined,
  setMenus: (resources?: FeatResource[]) => {
    set({ menus: resources });
  },
}));
