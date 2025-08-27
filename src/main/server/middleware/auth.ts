import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId;
    if (!userId) return next();

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      req.user = { id: user.id, email: user.email }; // ✅ only id & email
    }

    next();
  } catch (err) {
    next(err);
  }
};
