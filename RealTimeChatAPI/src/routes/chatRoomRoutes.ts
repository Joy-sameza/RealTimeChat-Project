import { Router } from "express";

const chatRoomRoutes = Router();

chatRoomRoutes.post("/create");
chatRoomRoutes.get("/get/list");
chatRoomRoutes.get("/get/:chatRoomId");
chatRoomRoutes.put("/update/");
chatRoomRoutes.delete("/delete/:chatRoomId");

export default chatRoomRoutes;
