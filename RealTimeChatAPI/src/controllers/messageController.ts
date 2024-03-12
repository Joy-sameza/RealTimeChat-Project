import { Request, Response } from "express";
import {
  createNewMessage,
  deleteUsersMessageById,
  getMessageFomChatroomById,
  getUserMessageById,
} from "../directus/directusCrud.js";

export async function createMessage(req: Request, res: Response) {
  try {
    const { body } = req;
    await createNewMessage(body).then(() => {
      res.json({
        message: "new message created",
        data: body,
      });
    });
    return;
  } catch (error) {
    throw new Error(
      `message Controller, error creating message ${error.message ?? null}`,
    );
  }
}

export async function getMessagesInChatroomById(req: Request, res: Response) {
  try {
    const { chatRoomId, messageId } = req.params;
    await getMessageFomChatroomById(
      parseInt(chatRoomId),
      parseInt(messageId),
    ).then((message) => {
      res.json({
        message: "Message fetched Successfully",
        data: message,
      });
      return;
    });
  } catch (error) {
    throw new Error(
      `messageControlloer, error fetching message ${error.message ?? null}`,
    );
  }
}

export async function getMessagesForUserById(req: Request, res: Response) {
  try {
    const { userId, messageId } = req.params;
    await getUserMessageById(parseInt(messageId), parseInt(userId)).then(
      (message) => {
        res.json({
          message: "Message fetched Successfully",
          data: message,
        });
      },
    );
  } catch (error) {
    throw new Error(
      `messageControlloer, error fetching message ${error.message ?? null}`,
    );
  }
}

export async function updateUserMessageById(req: Request, res: Response) {
  try {
    const { message, userId } = req.body;
    await updateUserMessageById(message, userId).then((updatedMessage) => {
      res.json({
        message: "Message updated successfully",
        data: updatedMessage,
      });
    });
  } catch (error) {
    throw new Error(
      `messageControlloer, error updating message ${error.message ?? null}`,
    );
  }
}

export async function deleteAUserMessageById(req: Request, res: Response) {
  try {
    const { userId, messageId } = req.params;
    await deleteUsersMessageById(parseInt(messageId), parseInt(userId)).then(
      () => {
        res.json({
          message: "message deleted sucessfully",
          data: null,
        });
      },
    );
  } catch (error) {
    throw new Error(
      `messageController, error deleting message ${error.message ?? null}`,
    );
  }
}
