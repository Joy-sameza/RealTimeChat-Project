import { Router } from "express";
import {
  createMessage,
  deleteAUserMessageById,
  getMessagesForUserById,
  getMessagesInChatroomById,
  updateMessageById,
} from "../controllers/messageController.js";
import { isLogedIn } from "../middlewares/authMiddleware.js";
import { isAdminOrAuthor } from "../middlewares/roleMiddleWare.js";
import { validateDataFor } from "../middlewares/dataValidation.js";

const messageRoutes = Router();

/**
 * @openapi
 * '/api/message/creat':
 *  post:
 *     tags:
 *     - Message EndPoints
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - content
 *              - senderId
 *              - chatRoomId
 *            properties:
 *              content:
 *                type: string
 *                default: "Hello world!"
 *              senderId:
 *                type: integer
 *                default: 1
 *              chatRoomId:
 *                type: integer
 *                default: 1
 *              responseToMessageId:
 *                type: integer
 *                default: none
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
messageRoutes.post(
  "/creat",
  [isLogedIn, validateDataFor("message")],
  createMessage,
);

/**
 * @openapi
 * '/api/message/get/messagein/{chatRoomId}/{messageId}':
 *  get:
 *     tags:
 *     - Message EndPoints
 *     summary: Retrives a message in a chatroom
 *     parameters:
 *      - name: chatRoomId
 *        in: path
 *        description: The chatrooId of the message
 *        required: true
 *      - name: messageId
 *        in: path
 *        description: The messageId of the message
 *        required: true
 *     responses:
 *      200:
 *        description: Loged out Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
messageRoutes.get(
  "/get/messagein/:chatRoomId/:messageId",
  [isLogedIn],
  getMessagesInChatroomById,
);

/**
 * @openapi
 * '/api/message/get/{userId}/{messageId}':
 *  get:
 *     tags:
 *     - Message EndPoints
 *     summary: Retrives a users message by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The userId of the user
 *        required: true
 *      - name: messageId
 *        in: path
 *        description: The userId of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Loged out Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
messageRoutes.get(
  "/get/:userId/:messageId",
  [isLogedIn, isAdminOrAuthor("message")],
  getMessagesForUserById,
);

/**
 * @openapi
 * '/api/message/update/{messageId}':
 *  put:
 *     tags:
 *     - Message EndPoints
 *     summary: Modify a users message
 *     parameters:
 *      - name: messageId
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
 *              userId:
 *                type: integer
 *                default: 1
 *              content:
 *                type: string
 *                default: 'user'
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
messageRoutes.put(
  "/update/:messageId",
  [isLogedIn, isAdminOrAuthor("message"), validateDataFor("message")],
  updateMessageById,
);

/**
 * @openapi
 * '/api/message/delete/{userId}/{messageId}':
 *  delete:
 *     tags:
 *     - Message EndPoints
 *     summary: Delete a users message by Id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The unique Id of the user
 *        required: true
 *      - name: messageId
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
messageRoutes.delete(
  "/delete/:userId/:messageId",
  [isLogedIn, isAdminOrAuthor("message")],
  deleteAUserMessageById,
);

export default messageRoutes;
