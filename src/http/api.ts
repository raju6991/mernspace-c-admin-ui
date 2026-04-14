import type { Credentials } from "../types";
import { api } from "./client";
// Auth service
export const login = (credential: Credentials) =>
  api.post("/auth/login", credential);
