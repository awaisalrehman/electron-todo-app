import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().pipe(z.email()),
  password: z.string().min(1, 'Password is required'),
});

export const RegisterSchema = z.object({
  fullName: z.string(),
  email: z.string().trim().pipe(z.email()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
