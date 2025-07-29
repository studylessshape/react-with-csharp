import { create } from "zustand";
import type { FeatResource } from "../services/interfaces";

export interface FeatResourceState {
  resources?: FeatResource[];
  setResources: (resources?: FeatResource[]) => void;
}

export const useFeatResources = create<FeatResourceState>((set) => ({
  resources: undefined,
  setResources: (resources?: FeatResource[]) => {
    set({resources: resources})
  }
}));
