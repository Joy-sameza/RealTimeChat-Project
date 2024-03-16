import { ENCRIPTION_SECRET_KEY } from "../../config/config.js";
import jwt from "jsonwebtoken";

/**
 * @description Generates a token on user registration
 * @param data The registered user id, and role
 * @returns {string} jwt token
 */
export function generatToken(data: { id: number; role: string }) {
  return jwt.sign(data, ENCRIPTION_SECRET_KEY, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: "15d",
  });
}
