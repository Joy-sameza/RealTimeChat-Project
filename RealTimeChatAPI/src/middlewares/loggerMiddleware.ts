import { NextFunction, Request, Response } from "express";

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
