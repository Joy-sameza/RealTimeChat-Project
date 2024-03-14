import { Request, Response } from "express";
import {
  createNewChatRoom,
  deleteChatRoomWithId,
  getAChatRoomById,
  getAllChatRooms,
  updateChatRoomById,
} from "../directus/directusCrud.js";

export async function createChatRoom(req: Request, res: Response) {
  try {
    const { body } = req;

    await createNewChatRoom(body).then((newChatRoom) => {
      res.json({
        message: "Chatroom created successfully",
        data: newChatRoom,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `Message Controller Error creating Chat room/ ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function getAChatRoom(req: Request, res: Response) {
  try {
    const { chatRoomId } = req.params;
    await getAChatRoomById(parseInt(chatRoomId)).then((allChatrooms) => {
      res.json({
        message: "Chatroom retrived Successfully",
        data: allChatrooms,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `Message Controller Error retriving the Chat room/ ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function getChatRooms(req: Request, res: Response) {
  try {
    await getAllChatRooms().then((allChatrooms) => {
      res.json({
        message: "Chatrooms retrived Successfully",
        data: allChatrooms,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `Message Controller Error retriving Chat rooms/ ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function updateAChatRoom(req: Request, res: Response) {
  try {
    const { id } = req.body;
    await updateChatRoomById(id, req.body).then((allChatrooms) => {
      res.json({
        message: "Chatroom updated Successfully",
        data: allChatrooms,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `Message Controller Error updating the Chat room/ ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function deleteAChatRoom(req: Request, res: Response) {
  try {
    const { chatRoomId } = req.params;
    await deleteChatRoomWithId(parseInt(chatRoomId)).then((deletedChatRoom) => {
      res.json({
        message: "ChatRoom deleted",
        data: deletedChatRoom,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: `Message Controller Error deleting Chat room/ ${error.message ?? null}`,
      data: null,
    });
  }
}
