import { createDirectus, rest } from "@directus/sdk";

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
  chatroomId: number | ChatRoomType;
  attachment: File;
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
  `http://localhost:8055`,
).with(rest());
