import api from "./api";
import type { FeatResource, NormalError } from "./interfaces";

export function getAccessResource() {
  return api<FeatResource[], NormalError>(
    "/api/auth/FeatResource/GetAccessResource",
    "GET"
  );
}
