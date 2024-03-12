import { Router } from "express";
import {
  createMessage,
  deleteAUserMessageById,
  getMessagesForUserById,
  getMessagesInChatroomById,
  updateUserMessageById,
} from "../controllers/messageController.js";

const messageRoutes = Router();

messageRoutes.post("/creat", createMessage);
messageRoutes.get(
  "/get/chatroom/:chatRoomId/:messageId",
  getMessagesInChatroomById,
);
messageRoutes.get("/get/:userId/:messageId", getMessagesForUserById);
messageRoutes.put("/update", updateUserMessageById);
messageRoutes.delete("/delete/:userId/:messageId", deleteAUserMessageById);

export default messageRoutes;
