import api from "./api";
import type { None, LoginRequest, NormalError, UserProfile } from "./interfaces";

export function login(request: LoginRequest) {
    return api<UserProfile, NormalError>("/api/auth/Login", "POST", request);
}

export function logout() {
    return api<None, NormalError>("/api/auth/Logout", "POST");
}

export function getUserProfile() {
    return api<UserProfile, NormalError>("/api/auth/GetProfile", "GET");
}