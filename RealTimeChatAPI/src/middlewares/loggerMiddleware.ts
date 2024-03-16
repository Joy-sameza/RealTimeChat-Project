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
  const timeStamp = new Date();
  console.log(
    "src",
    req.headers.host,
    " --->|",
    req.method,
    "\t --->|",
    req.url,
    "\t --->|",
    timeStamp.toUTCString(),
  );
  next();
}
