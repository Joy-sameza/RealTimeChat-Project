import express from "express";
import { Server as NodeServer } from "node:http";
import cors from "cors";
import swaggerDocs from "./swagger.js";
import { Server as SocketIoServer } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoomRoutes from "./src/routes/chatRoomRoutes.js";
import messageRoutes from "./src/routes/messagesRoutes.js";
import realTimeChatManagment from "./src/chatSystem/chatLogic.js";

const PORT = 4000;
const HOST = "localhost";
const SERVER_URL = `http://${HOST}:${PORT}`;

const server = express();
const nodeApp = new NodeServer(server);
const io = new SocketIoServer(nodeApp);

server.use(express.json());
server.use(cors());
server.use("/maintainance", express.static("docs"));
server.use("/user", userRoutes);
server.use("/chatroom", chatRoomRoutes);
server.use("/message", messageRoutes);

io.on("connection", (socket) => {
  realTimeChatManagment(socket);
});

async function startServer() {
  try {
    server.listen(PORT, HOST, () => {
      swaggerDocs(server);
      console.info(
        `
        🗜   db connected    
        🚀  Server is running!    
        💬  Real-Time Chat server listening at ${SERVER_URL}/api
        📝  Real-Time Chat server documents at ${SERVER_URL}/docs
        📚  Real-Time Chat server maintainance documnets at ${SERVER_URL}/maintainance`,
      );
    });
  } catch (serverConnectionError) {
    console.error("Failed to start the server!");
  }
}

startServer();
