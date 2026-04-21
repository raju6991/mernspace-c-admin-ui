import type { Credentials, CreateUserData, CreateTenantData } from "../types";
import { api } from "./client";
// Auth service
export const login = (credential: Credentials) =>
  api.post("/auth/login", credential);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = () => api.get("users");
export const getTenants = () => api.get("tenants");
export const createUser = (user: CreateUserData) => api.post("/users", user);
export const createTenant = (data: CreateTenantData) => api.post("/tenants", data);
