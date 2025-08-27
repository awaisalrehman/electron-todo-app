import { z } from 'zod';
import type { User } from "@prisma/client";
import { LoginSchema, RegisterSchema } from '@src/schemas/auth';

declare global {
  // Safe user type (no password)
  type AuthUser = Omit<User, "password">;
  
  // Requests
  type LoginInput = z.infer<typeof LoginSchema>;
  type RegisterInput = z.infer<typeof RegisterSchema>;
  
  // Responses
  interface RegisterResponse {
    success: true;
    user: AuthUser;
  }
  
  interface LoginResponse {
    success: true;
    user: AuthUser;
  }
  
  interface LogoutResponse {
    success: true;
  }
  
  interface VerifyResponse {
    success: boolean;
    user?: AuthUser;
    error?: string;
  }
}

export {};
