import { NextFunction, Request, Response } from "express";
import { ENCRIPTION_SECRET_KEY } from "../../config/config.js";
import jwt from "jsonwebtoken";
import {
  getAChatRoomById,
  getDataOnUserById,
  getMessageById,
} from "../directus/directusCrud.js";

/**
 * @description Verify the priority or ownership of some data befor granting the possibelity of modification or deleting the target data.
 * @param objectName - Object name priority to verify
 * - chatroom "chatRoom"
 * - user "user"
 * - messages "message"
 * @returns
 */
export const isAdminOrAuthor = (objectName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;

      if (token) {
        const userData: Partial<
          jwt.JwtPayload | string | { id: number; role: string }
        > = jwt.verify(token, ENCRIPTION_SECRET_KEY);

        if (typeof userData !== "string") {
          switch (objectName) {
            case "chatRoom":
              const { chatRoomId } = req.params;

              await verifyPrivilageOnChatRoom(
                { id: userData.id, role: userData.role },
                parseInt(chatRoomId),
              ).then((isOk) => {
                if (isOk) {
                  next();
                } else {
                  res.json({
                    message:
                      "Can not access this chatRoom!, you are not the Author",
                    data: null,
                  });
                }
              });
              break;
            case "message":
              const { messageId } = req.params;
              await verifyPrivilageOnMessage(
                { id: userData.id, role: userData.role },
                parseInt(messageId),
              ).then((isOk) => {
                if (isOk) {
                  next();
                } else {
                  res.json({
                    message:
                      "Can not access this message!, you are not the Author",
                    data: null,
                  });
                }
              });
              break;
            case "user":
              const { userId } = req.params;
              await verifyPrivilageOnUser(
                { id: userData.id, role: userData.role },
                parseInt(userId),
              ).then((isOk) => {
                if (isOk) {
                  next();
                } else {
                  res.json({
                    message:
                      "Can not access this user!, you are not the Author",
                    data: null,
                  });
                }
              });
              break;
          }
        } else {
          throw new Error(`bad token ${userData}`);
        }
      } else {
        throw new Error("no token");
      }
    } catch (error) {
      res.clearCookie("token").json({
        message: `You are not logedin, please SigneIn first`,
        error: error,
      });
    }
  };
};

async function verifyPrivilageOnChatRoom(
  userData: { id: number; role: string },
  chatRoomId: number,
) {
  return await getAChatRoomById(chatRoomId).then((chatRoom) => {
    return userData.id === chatRoom.authorId || userData.role.includes("admin");
  });
}

async function verifyPrivilageOnMessage(
  userData: { id: number; role: string },
  messageId: number,
) {
  return await getMessageById(messageId).then((message) => {
    return userData.id === message.senderId || userData.role.includes("admin");
  });
}

async function verifyPrivilageOnUser(
  userData: { id: number; role: string },
  userId: number,
) {
  return await getDataOnUserById(userId).then((user) => {
    return userData.id === user.id || userData.role.includes("admin");
  });
}
