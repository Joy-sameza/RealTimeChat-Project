import { Response } from "express";

/**
 * @description Send back the error encountered in the process to the client
 * @param { Request } res - Express request object
 * @param {string} errorMessage - Error message to send backs
 * @param {Error} errorData - Errordata
 */
export function sendErrorToClient(
  res: Response,
  errorMessage: string,
  errorData: Error,
) {
  res.status(400).json({
    error: errorMessage,
    data: errorData,
  });
}
