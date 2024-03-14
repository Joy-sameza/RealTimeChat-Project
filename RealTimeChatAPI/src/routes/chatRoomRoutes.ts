import { Router } from "express";
import {
  createChatRoom,
  deleteAChatRoom,
  getAChatRoom,
  getChatRooms,
  updateAChatRoom,
} from "../controllers/chatRoomController.js";
import { isAdminOrAuthor } from "../middlewares/roleMiddleWare.js";
import { isLogedIn } from "../middlewares/authMiddleware.js";
import { validateDataFor } from "../middlewares/dataValidation.js";

const chatRoomRoutes = Router();

/**
 * @openapi
 * '/api/chatroom/create':
 *  post:
 *     tags:
 *     - ChatRoom EndPoints
 *     summary: Creating a chat room
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - locked
 *              - authorId
 *              - open
 *            properties:
 *              name:
 *                type: string
 *                default: "my chat room"
 *              description:
 *                type: string
 *                default: "a new chat room"
 *              locked:
 *                type: boolean
 *                default: false
 *              authorId:
 *                type: integer
 *                default: 2
 *              open:
 *                type: boolen
 *                default: true
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
chatRoomRoutes.post(
  "/create",
  [isLogedIn, validateDataFor("chatRoom")],
  createChatRoom,
);

/**
 * @openapi
 * '/api/chatroom/get/all':
 *  get:
 *     tags:
 *     - ChatRoom EndPoints
 *     summary: Retrives all user
 *     responses:
 *      200:
 *        description: Data retrived Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
chatRoomRoutes.get("/get/all", [isLogedIn], getChatRooms);

/**
 * @openapi
 * '/api/chatroom/get/{chatRoomId}':
 *  get:
 *     tags:
 *     - ChatRoom EndPoints
 *     summary: Retrives a Chatroom data with chatRoomId
 *     parameters:
 *      - name: chatRoomId
 *        in: path
 *        description: The userId of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Data retrived Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
chatRoomRoutes.get("/get/:chatRoomId", [isLogedIn], getAChatRoom);

/**
 * @openapi
 * '/api/chatroom/update/{chatRoomId}':
 *  put:
 *     tags:
 *     - ChatRoom EndPoints
 *     summary: Modify a Chatroom's data
 *     parameters:
 *      - name: chatRoomId
 *        in: path
 *        description: The userId of the user
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: 1
 *              name:
 *                type: string
 *                default: 'my new chatroom update'
 *              description:
 *                type: string
 *                default: 'My new chatroom description'
 *              locked:
 *                type: boolean
 *                default: true
 *              open:
 *                type: boolean
 *                default: true
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
chatRoomRoutes.put(
  "/update/:chatRoomId",
  [isLogedIn, isAdminOrAuthor("chatRoom"), validateDataFor("chatRoom")],
  updateAChatRoom,
);

/**
 * @openapi
 * '/api/chatroom/delete/{chatRoomId}':
 *  delete:
 *     tags:
 *     - ChatRoom EndPoints
 *     summary: Delete a Chatroom by Id
 *     parameters:
 *      - name: chatRoomId
 *        in: path
 *        description: The unique Id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
chatRoomRoutes.delete(
  "/delete/:chatRoomId",
  [isLogedIn, isAdminOrAuthor("chatRoom")],
  deleteAChatRoom,
);

export default chatRoomRoutes;
