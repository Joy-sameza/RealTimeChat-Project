import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENCRIPTION_SECRET_KEY } from "../../config/config.js";
import { sendErrorToClient } from "../utils/sendAndLogError.js";

/**
 * @description Verifies if the user is logedIn and grant access to the ressouce. If not, clears the token cookie and request the client to login
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Next function
 */
export function isLogedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (token) {
      const userData = jwt.verify(token, ENCRIPTION_SECRET_KEY);

      if (userData) {
        next();
      }
    } else {
      throw new Error("no token");
    }
  } catch (error) {
    res.cookie("token", "", { maxAge: 0 });
    sendErrorToClient(res, "Access denied, Please login", error);
  }
}
