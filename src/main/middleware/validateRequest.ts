import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { AppError } from './errorHandler';

type AnyZodObject = ZodObject<ZodRawShape>;

export const validateRequest = (
  source: 'body' | 'params' | 'query',
  schema: AnyZodObject
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const result = schema.parse(data);
      req[source] = result; // Replace with validated data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        next(new AppError('Validation failed', 400, details));
      } else {
        next(error);
      }
    }
  };
};
