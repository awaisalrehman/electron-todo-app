import { z } from 'zod';
import type { User } from "@prisma/client";
import { LoginSchema, RegisterSchema } from '../schemas/auth';

// Safe user type (no password)
export type AuthUser = Omit<User, "password">;

// Requests
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;

// Responses
export interface RegisterResponse {
  success: true;
  user: AuthUser;
}

export interface LoginResponse {
  success: true;
  user: AuthUser;
}

export interface LogoutResponse {
  success: true;
}

export interface VerifyResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}
