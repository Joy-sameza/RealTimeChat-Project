import {
  createItem,
  deleteItem,
  deleteItems,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import {
  ChatRoomType,
  MessageType,
  UserType,
  directus,
} from "./directuseConection.js";

// rooms
export async function createNewChatRoom(newRoomData: ChatRoomType) {
  try {
    return await directus.request(
      createItem("chatRooms", {
        ...newRoomData,
        createdAt: new Date(),
        updatedAt: new Date(),
        locked: false,
        open: true,
      }),
    );
  } catch (error) {
    throw new Error(
      `Chatroom Creation failed with error: ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function getAllChatRooms() {
  try {
    return await directus.request(readItems("chatRooms"));
  } catch (error) {
    throw new Error(
      `Error fetching chatrooms ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function getAChatRoomById(chatRoomId: number) {
  try {
    return await directus.request(readItem("chatRooms", chatRoomId));
  } catch (error) {
    throw new Error(
      `Error fetching the chatroom ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function updateChatRoomById(
  chatRoomId: number,
  chatRoomData: ChatRoomType,
) {
  try {
    return await directus.request(
      updateItem("chatRooms", chatRoomId, chatRoomData),
    );
  } catch (error) {
    throw new Error(
      `Error updating the chatroom ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function deleteChatRoomWithId(roomId: number) {
  try {
    const roomMembersToDelete = await directus
      .request(
        readItems("members", {
          filter: {
            chatRoomId: roomId,
          },
          fields: ["id"],
        }),
      )
      .catch(() => {
        return [];
      });

    if (roomMembersToDelete.length > 0) {
      await directus.request(
        deleteItems("members", [...roomMembersToDelete.map((x) => x.id)]),
      );
    }

    return await directus
      .request(deleteItem("chatRooms", roomId))
      .catch((deleteRoomError) => {
        throw deleteRoomError;
      });
  } catch (error) {
    throw new Error(
      `Chatroom delete failed with error: ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function getAllMessagesInChatRoomById(roomId: number) {
  try {
    const roomMessages = await directus.request(readItems("messages"));
    return roomMessages.filter((x) => x.chatRoomId === roomId);
  } catch (error) {
    throw new Error(
      `Error fetching messages for this room ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

// messages
export async function createNewMessage(newMessageData: MessageType) {
  try {
    return await directus.request(
      createItem("messages", {
        ...newMessageData,
        createdAt: new Date(),
        updatedAt: new Date(),
        responseToMessageId: undefined,
      }),
    );
  } catch (error) {
    throw new Error(
      `Chatroom new message creation failed with error: ${error.errors.map((x: { message: string }) => x.message)}`,
    );
  }
}

export async function deleteUsersMessageById(messageId: number) {
  try {
    return await directus.request(deleteItem("messages", messageId));
  } catch (error) {
    throw new Error(
      `Chatroom message delete failed with error: ${error.errors.map((x: { message: string }) => x.message)}`,
    );
  }
}

export async function getMessageById(messageId: number) {
  try {
    return await directus.request(readItem("messages", messageId));
  } catch (error) {
    throw new Error(
      `Chatroom message view failed with error: ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function updateUserMessageById(updateMessage: MessageType) {
  const { id } = updateMessage;
  try {
    return await directus.request(updateItem("messages", id, updateMessage));
  } catch (error) {
    throw new Error(
      `Chatroom message update failed with error: ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

export async function getMessageFomChatroomById(messageId: number) {
  try {
    return await directus.request(readItem("messages", messageId));
  } catch (error) {
    throw new Error(
      `Chatroom message view failed with error: ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}

// users
export async function createUser(userData: UserType) {
  try {
    return await directus.request(
      createItem("users", {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: false,
        role: "user",
        status: "online",
      }),
    );
  } catch (error) {
    throw new Error(
      `Could not create user ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
export async function updateDataOnUserById(userId: number, userData: UserType) {
  try {
    return await directus.request(updateItem("users", userId, userData));
  } catch (error) {
    throw new Error(
      `Could not update user ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
export async function getDataOnUserWithEmail(email: string) {
  try {
    return await directus.request(
      readItems("users", { search: email, limit: 1 }),
    );
  } catch (error) {
    throw new Error(
      `Could not get user data ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
export async function getAllUsersData() {
  try {
    return await directus.request(readItems("users"));
  } catch (error) {
    throw new Error(
      `Could not get all users ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
export async function getDataOnUserById(userId: number) {
  try {
    return await directus.request(readItem("users", userId));
  } catch (error) {
    throw new Error(
      `Could not get user ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
export async function deleteUsersAccountById(userId: number) {
  try {
    return await directus.request(deleteItem("users", userId));
  } catch (error) {
    throw new Error(
      `Could not delete user ${error.errors.map((x: { message: string }) => x.message) ?? null}`,
    );
  }
}
