import api from "./api";
import type { LoginRequest, ResError, UserProfile } from "./interfaces";

export function login(request: LoginRequest) {
    return api<UserProfile, ResError>("/api/auth/login", "POST", request);
}