import { Request, Response } from "express";
import {
  createNewChatRoom,
  deleteChatRoomWithId,
  getAChatRoomById,
  getAllChatRooms,
  getAllUsersInChatRoom,
  updateChatRoomById,
} from "../directus/directusCrud.js";
import { io } from "../../server.js";
import { sendErrorToClient } from "../utils/sendAndLogError.js";
import { ChatApiError } from "../customErrors/customErrors.js";

/**
 * @description Creates a chatroom using the minimal set of values required for a chatroom
 *
 * #### Minimal atributes required
 * ```ts
 * {
 * name: string;
 * authorId: number | UserType;
 * description: string;
 * }
 * ```
 * all the other attributes are handeled by the server
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function createChatRoom(req: Request, res: Response) {
  try {
    const { body } = req;

    body.profilePicture = `https://avatar.iran.liara.run/username?username=${body.name.split(" ")[0]}+${body.description.split(" ")[0]}`;

    console.log("1...chatroom");
    const newChatRoom = await createNewChatRoom(body).catch(
      (error: ChatApiError) => {
        res.status(error.errorCode).json({
          error: error.errorCode,
          data: error,
        });
      },
    ); // Call to directus controlle center for chatroom creation
    console.log("2...chatroom");

    if (newChatRoom) {
      io.emit("newRoom", newChatRoom); //Emite chatroom creation even for realtime

      res.status(200).json({
        message: "Chatroom created successfully",
        data: newChatRoom,
      });
    }
    return;
  } catch (error) {
    console.log("3...chatroom");

    sendErrorToClient(res, "Could not create new chat room", error);
  }
}

/**
 * @description Fetch a chatroom from directus using the chatroom id
 *
 * #### Chatroom Object returned
 * ```ts
 * {
 * id: number;
 * name: string;
 * authorId: number | UserType;
 * description: string;
 * profilePic: string;
 * createdAt: Date;
 * updatedAt: Date;
 * locked: boolean; // only admin can send messages
 * open: boolean; // can someone be adde
 * }
 * ```
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getAChatRoom(req: Request, res: Response) {
  try {
    const { chatRoomId } = req.params;

    const allChatrooms = await getAChatRoomById(parseInt(chatRoomId));

    res.json({
      message: "Chatroom retrived Successfully",
      data: allChatrooms,
    });
  } catch (error) {
    sendErrorToClient(res, "Could not get this chatroom data", error);
  }
}

/**
 * @description Fetch all aveilable chatrooms on directus
 *
 * #### Chatroom list returned
 * ```ts
 * {
 * id: number;
 * name: string;
 * authorId: number | UserType;
 * description: string;
 * profilePic: string;
 * createdAt: Date;
 * updatedAt: Date;
 * locked: boolean; // only admin can send messages
 * open: boolean; // can someone be adde
 * }[...]
 * ```
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getChatRooms(req: Request, res: Response) {
  try {
    const allChatrooms = await getAllChatRooms();
    res.json({
      message: "Chatrooms retrived Successfully",
      data: allChatrooms,
    });
  } catch (error) {
    sendErrorToClient(res, "Could not get the chatrooms", error);
  }
}

/**
 * @description Fetch all the users in this chatroom from directus using the chatroom id and the members collection
 *
 * #### Chatroom user list returned
 * ```ts
 * {
 * id: number;
 * userName: string;
 * email: string;
 * password: string;
 * role: string;
 * profilePicture: string;
 * verified: boolean;
 * createdAt: Date;
 * updatedAt: Date
 * }
 * ```
 *
 * #### Members Interface
 * ```ts
 * {
 * id: number;
 * userId: number | UserType;
 * chatRoomId: number | ChatRoomType;
 * roleInChatroom: string
 * }
 * ```
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getChatRoomUsers(req: Request, res: Response) {
  try {
    const { chatRoomId } = req.params;
    const allusers = await getAllUsersInChatRoom(parseInt(chatRoomId));
    res.json({
      message: "Chatrooms retrived Successfully",
      data: allusers,
    });
  } catch (error) {
    sendErrorToClient(res, "could not get chatroom users", error);
  }
}

/**
 * @description Updates a chatrooms on directus. this requires the following attributes
 *
 * #### Chatroom list returned
 * ```ts
 * {
 * id: number;
 * name: string;
 * authorId: number | UserType;
 * description: string;
 * profilePic: string;
 * }
 * ```
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function updateAChatRoom(req: Request, res: Response) {
  try {
    const { id } = req.body;

    const allChatrooms = await updateChatRoomById(id, req.body);
    res.json({
      message: "Chatroom updated Successfully",
      data: allChatrooms,
    });
  } catch (error) {
    sendErrorToClient(res, "Could not update chatroom", error);
  }
}

/**
 * @description This method deletes a chat room in the database.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function deleteAChatRoom(req: Request, res: Response) {
  try {
    const { chatRoomId } = req.params;

    const deletedChatRoom = await deleteChatRoomWithId(parseInt(chatRoomId));

    res.json({
      message: "ChatRoom deleted",
      data: deletedChatRoom,
    });
  } catch (error) {
    sendErrorToClient(res, "Could not delete the selected chatrooms", error);
  }
}
