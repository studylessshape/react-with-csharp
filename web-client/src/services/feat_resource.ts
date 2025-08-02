import api from "./api";
import type { FeatResource, NormalError } from "./interfaces";

export function getAccessMenu() {
  return api<FeatResource[], NormalError>(
    "/api/auth/FeatResource/GetAccessMenu",
    "GET"
  );
}
