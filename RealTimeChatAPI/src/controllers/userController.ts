import { Request, Response } from "express";
import {
  createUser,
  deleteUsersAccountById,
  getAllUsersData,
  getDataOnUserById,
  getDataOnUserWithEmail,
  updateDataOnUserById,
} from "../directus/directusCrud.js";
import bcrypt from "bcryptjs";
import { generatToken } from "../utils/generateToken.js";
import { sendErrorToClient } from "../utils/sendAndLogError.js";

/**
 * @description This methode attempts to Signeup/Register a user using the following information
 *
 * #### User minimal attributes required
 * ```ts
 * {
 * id: number;
 * userName: string;
 * userFullName:string;
 * email: string;
 * password: string;
 * role: string;
 * profilePicture: string;
 * }
 * ```
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function signeup(req: Request, res: Response) {
  try {
    const { body } = req;

    await getDataOnUserWithEmail(body.email).then(async (userList) => {
      if (userList.length > 0) {
        res.status(400).json({
          message: "User email already taken please login",
          data: null,
        });
        return;
      } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const profilePictureBoy = `https://avatar.iran.liara.run/public/boy?username=${body.userName}`;
        const profilePictureGirl = `https://avatar.iran.liara.run/public/girl?username=${body.userName}`;

        const userData = {
          ...body,
          profilePicture:
            body.gender === "male" ? profilePictureBoy : profilePictureGirl,
          password: hashedPassword,
        };

        await createUser(userData).then((newUser) => {
          res.cookie(
            "token",
            generatToken({ id: newUser.id, role: newUser.role }),
          );
          res.json({
            message: "User sucesfully created",
            data: newUser,
          });
          return;
        });
      }
    });
  } catch (error) {
    sendErrorToClient(res, "Could not create this user", error);
  }
}

/**
 * @description This methode logout a user and wips the token cookie
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token").json({ message: "logedout Sucessfully" });
  return;
}

/**
 * @description This methode attempts to Signup/Login a user using the following information and then generates a token for the subsequent requests
 *
 * #### User minimal attributes required
 * ```ts
 * {
 * email: string;
 * password: string;
 * }
 * ```
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function signein(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    //find user
    const userToLogin = await getDataOnUserWithEmail(email);
    if (userToLogin.length < 1) {
      res.status(400).json({
        error: "Invalide email or Password",
        data: null,
      });
      return;
    }
    const isValidPassword = bcrypt.compareSync(
      password,
      userToLogin[0].password,
    );

    if (!isValidPassword) {
      res.status(400).json({
        error: "Invalide email or Password",
        data: null,
      });
      return;
    }

    const token = generatToken({
      id: userToLogin[0].id,
      role: userToLogin[0].role,
    });

    res
      .setHeader("token", token)
      .cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: false,
      })
      .json({
        message: "User loged in successfully",
        data: { user: userToLogin[0], toke: token },
      });
    //validate password
    //return user data
  } catch (error) {
    sendErrorToClient(res, "Could not login this user", error);
  }
}

/**
 * @description This method gets a user with a corresponding id
 * 
 * @url http://`SERVER_HOST`/api/user/:userId
 * 
 * #### User object returned
 * ```ts
 * {
 * id: number;
 * userFullName: string;
 * userName: string;
 * email: string;
 * password: string;
 * role: string;
 * profilePicture: string;
 * verified: boolean;
 * createdAt: Date;
 * updatedAt: Date;
 * }
 *```

 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getUserDataById(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    await getDataOnUserById(parseInt(userId)).then((userdata) => {
      res.json({
        message: "User data fetched sucessfully",
        data: userdata,
      });
      return;
    });
  } catch (error) {
    sendErrorToClient(res, "Could not get this user data", error);
  }
}

/**
 * @description This method gets all the registered user
 * 
 * @url http://`SERVER_HOST`/api/user/:userId
 * 
 * #### Users list returned
 * ```ts
 * {
 * id: number;
 * userFullName: string;
 * userName: string;
 * email: string;
 * password: string;
 * role: string;
 * profilePicture: string;
 * verified: boolean;
 * createdAt: Date;
 * updatedAt: Date;
 * }[]
 *```

 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function getAllUsers(req: Request, res: Response) {
  try {
    await getAllUsersData().then((userdata) => {
      res.json({
        message: "Users data fetched sucessfully",
        data: userdata,
      });
      return;
    });
  } catch (error) {
    res.status(400).json({
      error: `userController could not get all users data ${error.message ?? null}`,
      data: null,
    });
    sendErrorToClient(res, "Could not get the set of user data", error);
  }
}

/**
 * @description This method Edits/Updates a user with a corresponding id
 *
 * @url http://`SERVER_HOST`/api/user/update/:userId
 *
 * #### User minimal attributes required
 * ```ts
 * {
 * id: number; // can not be modified
 * userName: string;
 * role: string;
 * }
 * ```
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function updateUserById(req: Request, res: Response) {
  try {
    const { body } = req;
    await updateDataOnUserById(body.id, body).then((userdata) => {
      res.json({
        message: "Users data updated sucessfully",
        data: userdata,
      });
      return;
    });
  } catch (error) {
    sendErrorToClient(res, "Could not get update this user data", error);
  }
}

/**
 * @description Deletes a user data
 *
 * @url http://`SERVER_HOST`/api/user/delete/:userId
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export async function deleUserById(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    await deleteUsersAccountById(parseInt(userId)).then(() => {
      res.json({
        message: "Users data deleted sucessfully",
        data: null,
      });
      return;
    });
  } catch (error) {
    sendErrorToClient(res, "Could not delete this user", error);
  }
}
