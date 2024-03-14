import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import swaggerDocs from "./swagger.js";
import { Server as SocketIoServer } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoomRoutes from "./src/routes/chatRoomRoutes.js";
import messageRoutes from "./src/routes/messagesRoutes.js";
import realTimeChatManagment from "./src/chatSystem/chatLogic.js";
import { SERVER_HOST, SERVER_PORT } from "./config/config.js";
import { loggIncommingRequests } from "./src/middlewares/loggerMiddleware.js";

const server = express();
const nodeApp = createServer(server);
const io = new SocketIoServer(nodeApp, { cors: { origin: "*" } });

server.use(express.json());
server.use(cors());
server.use("/", loggIncommingRequests);
server.use("/maintainance", express.static("docs"));
server.use("/api/user", userRoutes);
server.use("/api/chatroom", chatRoomRoutes);
server.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  console.log("connected");
  realTimeChatManagment(socket);
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
