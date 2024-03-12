import { Router } from "express";
import {
  deleUserById,
  getAllUsers,
  getUserDataById,
  signein,
  signeup,
  updateUserById,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/signup", signeup); //register
userRoutes.post("/signin", signein); //login
userRoutes.get("/get/user/data/:userId", getUserDataById);
userRoutes.get("/get/users", getAllUsers);
userRoutes.put("/update/user", updateUserById);
userRoutes.delete("/delete/user/:userId", deleUserById);

export default userRoutes;
