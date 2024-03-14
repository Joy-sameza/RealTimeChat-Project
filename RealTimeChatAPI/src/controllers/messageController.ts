import { Request, Response } from "express";
import {
  createNewMessage,
  deleteUsersMessageById,
  getMessageFomChatroomById,
  getMessageById,
  updateUserMessageById,
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
    res.status(400).json({
      message: `message Controller, error creating message ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function getMessagesInChatroomById(req: Request, res: Response) {
  try {
    const { messageId } = req.params;
    await getMessageFomChatroomById(parseInt(messageId)).then((message) => {
      res.json({
        message: "Message fetched Successfully",
        data: message,
      });
      return;
    });
  } catch (error) {
    res.status(400).json({
      message: `messageControlloer, error fetching message ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function getMessagesForUserById(req: Request, res: Response) {
  try {
    const { messageId } = req.params;
    await getMessageById(parseInt(messageId)).then((message) => {
      res.json({
        message: "Message fetched Successfully",
        data: message,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `messageControlloer, error fetching message ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function updateMessageById(req: Request, res: Response) {
  try {
    await updateUserMessageById(req.body).then((updatedMessage) => {
      res.json({
        message: "Message updated successfully",
        data: updatedMessage,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `messageControlloer, error updating message ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function deleteAUserMessageById(req: Request, res: Response) {
  try {
    const { messageId } = req.params;
    await deleteUsersMessageById(parseInt(messageId)).then(() => {
      res.json({
        message: "message deleted sucessfully",
        data: null,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `messageController, error deleting message ${error.message ?? null}`,
      data: null,
    });
  }
}
