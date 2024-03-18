import { NextFunction, Request, Response } from "express";

/**
 * @description logger middleware will log every request incomming to the server
 * @param {Response} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Next function
 */
export function loggIncommingRequests(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const finish = new Date();
    console.log(
      `[${finish.toLocaleTimeString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
    );
  });
  next();
}
