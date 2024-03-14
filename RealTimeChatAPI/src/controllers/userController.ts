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
import { getToken } from "../middlewares/authMiddleware.js";

export async function signeup(req: Request, res: Response) {
  try {
    const { body } = req;

    await getDataOnUserWithEmail(body.email).then(async (userList) => {
      if (userList.length > 0) {
        res.status(400).json({
          message: "User email already taken please login",
          data: null,
        });
      } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const userData = { ...body, password: hashedPassword };

        await createUser(userData).then((newUser) => {
          res.json({
            message: "User sucesfully created",
            data: newUser,
          });
          return "data";
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: `CUserController could not create user ${error ?? null}`,
      data: null,
    });
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token").json({ message: "logedout Sucessfully" });
  return;
}

export async function signein(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    //find user
    await getDataOnUserWithEmail(email).then((userToLogin) => {
      const isValidPassword = bcrypt.compareSync(
        password,
        userToLogin[0].password,
      );

      if (!isValidPassword) {
        res.status(400).json({
          message: "Invalide Password",
          data: null,
        });
        return;
      }

      const token = getToken({
        id: userToLogin[0].id,
        role: userToLogin[0].role,
      });

      res
        .setHeader("token", token)
        .cookie("token", token, { httpOnly: false })
        .json({
          message: "User loged in successfully",
          data: token,
        });
    });
    //validate password
    //return user data
  } catch (error) {
    res.status(400).json({
      message: `userController could not signein users ${error.message ?? null}`,
      data: null,
    });
  }
}

export async function signeOutUser(req: Request, res: Response) {
  res.clearCookie("token");
  return;
}

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
    res.status(400).json({
      message: `userController could not get users data ${error.message ?? null}`,
      data: null,
    });
  }
}

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
      message: `userController could not get all users data ${error.message ?? null}`,
      data: null,
    });
  }
}

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
    res.status(400).json({
      message: `userController could not update users data ${error.message ?? null}`,
      data: null,
    });
  }
}

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
    res.status(400).json({
      message: `userController could not delete users data ${error.message ?? null}`,
      data: null,
    });
  }
}
