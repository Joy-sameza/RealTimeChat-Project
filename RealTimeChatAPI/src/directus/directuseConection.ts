import {
  authentication,
  createCollection,
  createDirectus,
  readCollections,
  rest,
} from "@directus/sdk";
import {
  userCollection,
  chatRoomsCollection,
  messagesCollection,
} from "../database/directusCollection.js";
import {
  DIRECTUS_ADMIN_EMAIL,
  DIRECTUS_ADMIN_PASSWORD,
  DIRECTUS_HOST,
  DIRECTUS_PORT,
} from "../../config/config.js";

export interface ChatRoomType {
  id: number;
  name: string;
  authorId: number | UserType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  locked: boolean; // only admin can send messages
  open: boolean; // can someone be added
}

export interface UserType {
  id: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  status: string; // online offline away
}

export interface MemeberType {
  id: number;
  userId: number | UserType;
  chatRoomId: number | ChatRoomType;
  roleInChatroom: string;
}

export interface MessageType {
  id: number;
  content: string;
  senderId: number | UserType;
  chatRoomId: number | ChatRoomType;
  createdAt: Date;
  updatedAt: Date;
  responseToMessageId: number | MemeberType;
}

export interface SchemaType {
  users: UserType[];
  chatRooms: ChatRoomType[];
  members: MemeberType[];
  messages: MessageType[];
}

export const directus = createDirectus<SchemaType>(
  `http://${DIRECTUS_HOST}:${DIRECTUS_PORT}`,
)
  .with(authentication("json"))
  .with(rest());

await directus
  .login(DIRECTUS_ADMIN_EMAIL, DIRECTUS_ADMIN_PASSWORD)
  .then(async () => {
    await directus.request(readCollections()).then(async (res) => {
      const collectionList = res.map((x) => x.collection);
      if (!collectionList.includes("users")) {
        await directus
          .request(createCollection(userCollection))
          .then(() => {
            console.log(" user collection created");
          })
          .catch((err) => {
            console.log(err.errors.map((x: { message: string }) => x.message));
          });
      }

      if (!collectionList.includes("chatRooms")) {
        await directus
          .request(createCollection(chatRoomsCollection))
          .then(() => {
            console.log("chatroom collection created");
          })
          .catch((err) => {
            console.log(err.errors.map((x: { message: string }) => x.message));
          });
      }
      if (!collectionList.includes("messages")) {
        await directus
          .request(createCollection(messagesCollection))
          .then(() => {
            console.log("messages collection created");
          })
          .catch((err) => {
            console.log(err.errors.map((x: { message: string }) => x.message));
          });
      }
    });
  });
