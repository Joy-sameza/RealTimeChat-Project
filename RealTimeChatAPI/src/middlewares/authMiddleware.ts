import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENCRIPTION_SECRET_KEY } from "../../config/config.js";

export function getTokenValue(str: string, tokenName: string): string | null {
  const name = tokenName + "=";
  const parts = str.split(";");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (part.indexOf(name) === 0) {
      return part.substring(name.length, part.length);
    }
  }
  return null;
}

export function isLogedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { cookie } = req.headers;
    const token = getTokenValue(cookie!, "token");
    if (token) {
      const userData = jwt.verify(token, ENCRIPTION_SECRET_KEY);
      if (userData) {
        next();
      }
    } else {
      throw new Error("no token");
    }
  } catch (error) {
    res.clearCookie("token").json({
      message: "You are not logedin, please SigneIn first",
      data: null,
    });
  }
}

export function getToken(data: { id: number; role: string }) {
  return jwt.sign(data, ENCRIPTION_SECRET_KEY, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "1d",
  });
}
