export interface ChatRoomType {
  id: number;
  name: string;
  authorId: number | UserType;
  description: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
  locked: boolean; // only admin can send messages
  open: boolean; // can someone be added
}

export interface UserType {
  id: number;
  userFullName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  profilePicture: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
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
