import userSchema from "./dataValidation/userSchema.js";
import chatRoomSchema from "./dataValidation/chatRoomSchema.js";
import messageSchema from "./dataValidation/messageSchema.js";
import { NextFunction, Request, Response } from "express";
import loginSchema from "./dataValidation/loginSchema.js";
import updateUserSchema from "./dataValidation/updatedUserSchema.js";
import { sendErrorToClient } from "../utils/sendAndLogError.js";

/**
 * @description This is the data validation middleware
 * @param objectName - Used to validate the following data incomming
 * - user register data "user"
 * - user update "update"
 * - user login "login"
 * - chatroom creation/edit "chatRoom"
 * - message creation/edit "message"
 * @returns
 */
export const validateDataFor = (objectName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      switch (objectName) {
        case "user":
          userSchema.parse(body);
          next();
          break;
        case "chatRoom":
          chatRoomSchema.parse(body);
          next();
          break;
        case "message":
          messageSchema.parse(body);
          next();
          break;
        case "login":
          loginSchema.parse(body);
          next();
          break;
        case "update":
          updateUserSchema.parse(body);
          next();
          break;
      }
    } catch (error) {
      sendErrorToClient(res, "data validation error", error);
    }
  };
};
