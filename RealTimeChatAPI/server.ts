import express from "express";
import path from "node:path";
import { createServer } from "node:http";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerDocs from "./swagger.js";
import { Server as SocketIoServer } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoomRoutes from "./src/routes/chatRoomRoutes.js";
import messageRoutes from "./src/routes/messagesRoutes.js";
import realTimeChatManagment from "./src/chatSystem/chatLogic.js";
import { SERVER_HOST, SERVER_PORT } from "./config/config.js";
import { loggIncommingRequests } from "./src/middlewares/loggerMiddleware.js";
import adminRoutes from "./src/routes/adminRoutes.js";

const server = express();
const nodeApp = createServer(server);
export const io = new SocketIoServer(nodeApp, { cors: { origin: "*" } });
const __dirname = path.resolve();
console.log(__dirname);
server.use(express.json());
server.use(cors({ origin: "*" }));
server.use(cookieParser());
server.use("/", loggIncommingRequests);
server.use("/maintainance", express.static("docs"));
server.use("/api/admin", adminRoutes);
server.use("/api/user", userRoutes);
server.use("/api/chatroom", chatRoomRoutes);
server.use("/api/message", messageRoutes);
server.use("/demo", express.static("../chat-app-demo/dist"));

const socketMap: Partial<{ userId: string; value: string } | never>[] = [];
const roomMap: string[] = [];

// export function socketChatRoomSocketId(chatRoomId){
//   // chatRoomId
// }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId?.toString();
  if (userId !== undefined) socketMap.push({ userId, value: socket.id });
  console.log(socketMap.map((x) => x.userId));
  io.emit(
    "getOnlineUsers",
    socketMap.map((x) => x.userId),
  );

  socket.on("joinRoom", (roomId) => {
    console.log(socket.rooms.has(roomId));
    if (!socket.rooms.has(roomId)) {
      console.log(roomId, "room join");
      roomMap.push(roomId);
      socket.join(roomId);
      socket.to(roomId).emit("joinRoom", "new member");
    }
  });

  socket.on("leaveRoom", (roomId, user) => {
    if (socket.rooms.has(roomId)) {
      console.log(roomId, "room out");
      roomMap.filter((x) => x !== roomId);
      socket.leave(roomId);
      socket.to(roomId).emit("leaveRoom", `${user} left`);
    }
  });

  realTimeChatManagment(socket);

  socket.on("disconnect", () => {
    if (userId !== undefined) socketMap.filter((x) => x.userId !== userId);
    io.emit("getOnlineUsers", Object.keys(socketMap));
  });
});

async function startServer() {
  try {
    nodeApp.listen(parseInt(SERVER_PORT), SERVER_HOST, async () => {
      swaggerDocs(server);
      console.info(
        `
        🗜   db connected    
        🚀  Server is running!    
        💬  Real-Time Chat server listening at http://${SERVER_HOST}:${SERVER_PORT}/api
        📝  Real-Time Chat server documents at http://${SERVER_HOST}:${SERVER_PORT}/docs
        📚  Real-Time Chat server maintainance documnets at http://${SERVER_HOST}:${SERVER_PORT}/maintainance`,
      );
    });
  } catch (serverConnectionError) {
    console.error("Failed to start the server!");
  }
}

startServer();
