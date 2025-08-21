import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { RegisterInput, LoginInput } from '../../shared/schemas/auth';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const authController = {
  register: async (req: Request, res: Response) => {
    const { email, password }: RegisterInput = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds = 10

    // Create user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Set session after successful registration
    req.session.userId = user.id;

    res.status(201).json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  },

  login: async (req: Request, res: Response) => {
    const { email, password }: LoginInput = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 400);
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError('Invalid credentials', 400);
    }

    // Set session after successful login
    req.session.userId = user.id;

    res.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) return next(new AppError('Failed to logout', 500));
      res.json({ success: true });
    });
  },
};
