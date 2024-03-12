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
import jwt from "jsonwebtoken";

const SECRET_KEY = "secrete";

export async function signeup(req: Request, res: Response) {
  try {
    const { body } = req.body;

    await getDataOnUserWithEmail(body.email)
      .then(() => {
        res.status(400).json({
          message: "User email already taken please login",
          data: null,
        });
      })
      .catch(async () => {
        const userData = { ...body, password: bcrypt.hash(body.password, 10) };

        await createUser(userData).then((newUser) => {
          res.json({
            message: "User sucesfully created",
            data: newUser,
          });
          return;
        });
      });
  } catch (error) {
    throw new Error(`CUserController could not create user ${error ?? null}`);
  }
}

export async function signein(req: Request, res: Response) {
  try {
    const { userData } = req.body;
    //find user
    await getDataOnUserWithEmail(userData.email).then((userToLogin) => {
      const isValidPassword = bcrypt.compareSync(
        userData.password,
        userToLogin.password,
      );

      if (!isValidPassword) {
        res.status(400).json({
          message: "Invalide Password",
          data: null,
        });
        return;
      }

      const token = jwt.sign({ id: userToLogin.id }, SECRET_KEY, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });

      res.json({
        message: "User loged in successfully",
        data: token,
      });
    });
    //validate password
    //return user data
  } catch (error) {
    throw new Error(
      `userController could not signein users ${error.message ?? null}`,
    );
  }
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
    throw new Error(
      `userController could not get users data ${error.message ?? null}`,
    );
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
    throw new Error(
      `userController could not get all users data ${error.message ?? null}`,
    );
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const { userData } = req.body;

    await updateDataOnUserById(userData.id, userData).then((userdata) => {
      res.json({
        message: "Users data updated sucessfully",
        data: userdata,
      });
      return;
    });
  } catch (error) {
    throw new Error(
      `userController could not update users data ${error.message ?? null}`,
    );
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
    throw new Error(
      `userController could not delete users data ${error.message ?? null}`,
    );
  }
}
