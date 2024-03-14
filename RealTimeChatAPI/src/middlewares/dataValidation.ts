import userSchema from "./dataValidation/userSchema.js";
import chatRoomSchema from "./dataValidation/chatRoomSchema.js";
import messageSchema from "./dataValidation/messageSchema.js";
import { NextFunction, Request, Response } from "express";
import loginSchema from "./dataValidation/loginSchema.js";
import updateUserSchema from "./dataValidation/updatedUserSchema.js";

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
      res.status(400).json({ message: "data validation error", error });
    }
  };
};
