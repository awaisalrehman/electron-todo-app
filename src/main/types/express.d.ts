import { User } from '@prisma/client';
import "express-session";

// Augment Express Request
declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, "id" | "email">;
    }
  }
}

// Augment express-session
declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}
