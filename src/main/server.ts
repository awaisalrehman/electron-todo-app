import express from 'express';
import { sessionMiddleware } from './middleware/session';
import { PrismaClient } from '@prisma/client';
import { authController } from './controllers/authController';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { validateRequest } from './middleware/validateRequest';
import { RegisterSchema, LoginSchema } from '../shared/schemas/auth'
import { asyncHandler } from './utils/asyncHandler';

export class Server {
  private app: express.Application;
  private prisma: PrismaClient;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(requestLogger);
    this.app.use(sessionMiddleware);
  }

  private configureRoutes() {
    // Auth routes
    this.app.post('/api/auth/register', validateRequest('body', RegisterSchema), asyncHandler(authController.register));
    this.app.post('/api/auth/login', validateRequest('body', LoginSchema), asyncHandler(authController.login));
    this.app.post('/api/auth/logout', asyncHandler(authController.logout));
    
    // Error handling
    this.app.use(errorHandler);
  }

  async start() {
    try {
      await this.prisma.$connect();
      console.log('Database connected successfully');
      
      this.app.listen(3001, () => {
        console.log('Backend server running on port 3001');
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  async stop() {
    await this.prisma.$disconnect();
  }
}
