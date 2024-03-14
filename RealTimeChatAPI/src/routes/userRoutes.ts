import { Router } from "express";
import {
  deleUserById,
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
 *     summary: Login as a user
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
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
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
 *     summary: Login as a user
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
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
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
 *     summary: logsout a user
 *     responses:
 *      200:
 *        description: user loged Successfully
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
 *     summary: Retrives user data with userId
 *     parameters:
 *      - name: userId
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
userRoutes.get("/get/data/:userId", [isLogedIn], getUserDataById);

/**
 * @openapi
 * '/api/user/get/all':
 *  get:
 *     tags:
 *     - User EndPoints
 *     summary: Retrives all user
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
userRoutes.get("/get/all", [isLogedIn], getAllUsers);

/**
 * @openapi
 * '/api/user/update/{userId}':
 *  put:
 *     tags:
 *     - User EndPoints
 *     summary: Modify a users data
 *     parameters:
 *      - name: userId
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
 *        description: Modified
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
 *     summary: Delete user by Id
 *     parameters:
 *      - name: userId
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
userRoutes.delete(
  "/delete/:userId",
  [isLogedIn, isAdminOrAuthor("user")],
  deleUserById,
);

export default userRoutes;
