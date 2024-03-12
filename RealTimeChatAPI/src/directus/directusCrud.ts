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

function verifyMessageAuthor(message: MessageType, userId: number) {
  return message.id === userId;
}

function verifyMessageChatroom(message: MessageType, userId: number) {
  return message.chatroomId === userId;
}

// rooms
export async function createNewRoom(newRoomData: ChatRoomType, userId: number) {
  const { description, name } = newRoomData;
  try {
    return await directus.request(
      createItem("chatRooms", {
        authorId: userId,
        description: description,
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
        locked: false,
        open: true,
      }),
    );
  } catch (error) {
    throw new Error(
      `Chatroom Creation failed with error: ${error.message ?? null}`,
    );
  }
}

export async function deleteRoomWithId(roomId: number) {
  try {
    let roomMembersToDelete = await directus.request(
      readItems("members", {
        fields: ["id", "chatRoomId"],
      }),
    );

    //Filter memebers that need to be deleted
    roomMembersToDelete = roomMembersToDelete.filter(
      (x) => x.chatRoomId === roomId,
    );

    return await directus
      .request(
        deleteItems("members", [...roomMembersToDelete.map((x) => x.id)]),
      )
      .then(async () => {
        await directus.request(deleteItem("chatRooms", roomId));
      })
      .catch((deleteRoomError) => {
        throw deleteRoomError;
      });
  } catch (error) {
    throw new Error(
      `Chatroom delete failed with error: ${error.message ?? null}`,
    );
  }
}

export async function getAllMessagesInRoomById(roomId: number) {
  try {
    const roomMessages = await directus.request(readItems("messages"));
    return roomMessages.filter((x) => x.chatroomId === roomId);
  } catch (error) {
    throw new Error(
      `Error fetching messages for this room ${error.message ?? null}`,
    );
  }
}

// messages
export async function createNewMessage(newMessageData: MessageType) {
  try {
    return await directus.request(
      createItem("messages", {
        ...newMessageData,
        attachment: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        responseToMessageId: undefined,
      }),
    );
  } catch (error) {
    throw new Error(
      `Chatroom new message creation failed with error: ${error.message}`,
    );
  }
}

export async function deleteUsersMessageById(
  messageId: number,
  userId: number,
) {
  try {
    await directus
      .request(readItem("messages", userId))
      .then(async (message) => {
        if (verifyMessageAuthor(message, userId)) {
          return await directus.request(deleteItem("messages", messageId));
        } else {
          throw new Error(
            "Can not delete this message!, you are not the Author",
          );
        }
      });
  } catch (error) {
    throw new Error(
      `Chatroom message delete failed with error: ${error.message}`,
    );
  }
}

export async function getUserMessageById(messageId: number, userId: number) {
  try {
    return await directus
      .request(readItem("messages", messageId))
      .then(async (message) => {
        if (verifyMessageAuthor(message, userId)) {
          return message;
        } else {
          throw new Error("Can not view this message!, you are not the Author");
        }
      });
  } catch (error) {
    throw new Error(
      `Chatroom message view failed with error: ${error.message ?? null}`,
    );
  }
}

export async function updateUserMessageById(
  updateMessage: MessageType,
  userId: number,
) {
  const { id } = updateMessage;
  try {
    return await directus
      .request(readItem("messages", userId))
      .then(async (message) => {
        if (verifyMessageAuthor(message, userId)) {
          return await directus.request(
            updateItem("messages", id, updateMessage),
          );
        } else {
          throw new Error(
            "Can not update this message!, you are not the Author",
          );
        }
      });
  } catch (error) {
    throw new Error(
      `Chatroom message update failed with error: ${error.message ?? null}`,
    );
  }
}

export async function getMessageFomChatroomById(
  chatRoomId: number,
  messageId: number,
) {
  try {
    return directus.request(readItem("messages", messageId)).then((message) => {
      if (verifyMessageChatroom(message, chatRoomId)) {
        return message;
      } else {
        throw new Error(
          "Can not view this message!, does not belong to this chat room",
        );
      }
    });
  } catch (error) {
    throw new Error(
      `Chatroom message view failed with error: ${error.message ?? null}`,
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
      }),
    );
  } catch (error) {
    throw new Error(`Could not create user ${error.message ?? null}`);
  }
}
export async function updateDataOnUserById(userId: number, userData: UserType) {
  try {
    return await directus.request(updateItem("users", userId, userData));
  } catch (error) {
    throw new Error(`Could not update user ${error.message ?? null}`);
  }
}
export async function getDataOnUserWithEmail(email: string) {
  try {
    return await directus.request(readItem("users", email));
  } catch (error) {
    throw new Error(`Could not get user data ${error.message ?? null}`);
  }
}
export async function getAllUsersData() {
  try {
    return await directus.request(readItems("users"));
  } catch (error) {
    throw new Error(`Could not get all users ${error.message ?? null}`);
  }
}
export async function getDataOnUserById(userId: number) {
  try {
    return await directus.request(readItem("users", userId));
  } catch (error) {
    throw new Error(`Could not get user ${error.message ?? null}`);
  }
}
export async function deleteUsersAccountById(userId: number) {
  try {
    return await directus.request(deleteItem("users", userId));
  } catch (error) {
    throw new Error(`Could not delete user ${error.message ?? null}`);
  }
}
