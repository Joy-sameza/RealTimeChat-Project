import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserDataById,
  logoutUser,
  signein,
  signeup,
  updateUserById,
} from "../controllers/userController.js";
import { isLogedIn } from "../middlewares/authMiddleware.js";
import { isAdminOrAuthor } from "../middlewares/roleMiddleWare.js";
import { validateDataFor } from "../middlewares/dataValidation.js";

const userRoutes = Router();

/**
 * @openapi
 * '/api/user/signup':
 *  post:
 *     tags:
 *     - User EndPoints
 *     summary: attenpts to register as a user when provided with the required data
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - userName
 *              - profilePicture
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              userName:
 *                type: string
 *                default: johndoe
 *              profilePicture:
 *                type: string
 *                default: none
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.post("/signup", [validateDataFor("user")], signeup); //register

/**
 * @openapi
 * '/api/user/signin':
 *  post:
 *     tags:
 *     - User EndPoints
 *     summary: Attempts to Login as a user provided with the required credentials
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.post("/signin", [validateDataFor("login")], signein); //login

/**
 * @openapi
 * '/api/user/logout':
 *  get:
 *     tags:
 *     - User EndPoints
 *     summary: Attempt to logout a user that has logedin already
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.get("/logout", [isLogedIn], logoutUser);

/**
 * @openapi
 * '/api/user/get/data/{userId}':
 *  get:
 *     tags:
 *     - User EndPoints
 *     summary: Fetches a users data with the corresponding userId
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The userId of the user
 *        required: true
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.get("/get/data/:userId", [isLogedIn], getUserDataById);

/**
 * @openapi
 * '/api/user/get/all':
 *  get:
 *     tags:
 *     - User EndPoints
 *     summary: Fetches all the registered users
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.get("/get/all", [isLogedIn], getAllUsers);

/**
 * @openapi
 * '/api/user/update/{userId}':
 *  put:
 *     tags:
 *     - User EndPoints
 *     summary: Modify a users data with the corresponding id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The userId of the user to be edited
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
 *                type: integer
 *                default: 1
 *              userName:
 *                type: string
 *                default: 'johndoe'
 *              role:
 *                type: string
 *                default: 'user'
 *              status:
 *                type: string
 *                default: 'offline'
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.put(
  "/update/:userId",
  [isLogedIn, isAdminOrAuthor("user"), validateDataFor("update")],
  updateUserById,
);

/**
 * @openapi
 * '/api/user/delete/{userId}':
 *  delete:
 *     tags:
 *     - User EndPoints
 *     summary: Delete user with the corresponding Id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The unique Id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: request succesful
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRoutes.delete(
  "/delete/:userId",
  [isLogedIn, isAdminOrAuthor("user")],
  deleteUserById,
);

export default userRoutes;
