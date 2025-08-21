import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps async Express route handlers and forwards errors to `next()`.
 *
 * Usage:
 *   router.get("/users", asyncHandler(async (req, res) => { ... }));
 */

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
