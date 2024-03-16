import {
  createItem,
  deleteItem,
  deleteItems,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { directus } from "./directuseConection.js";
import { ChatRoomType, MessageType, UserType } from "../interface/dataTypes.js";

/**
 * @description Creates a new chatroom
 *
 * @example
 * try{
 * // pass the new chatroom attributes to the function like this
 *  const newChatRoom = await createNewChatRoom(body);
 * }catch(error){
 *  console.log(error.message)
 * }
 * @param {ChatRoomType} newRoomData - New chatroom data to be completed befor creation
 * @returns {ChatRoomType} Returns the item objects of the item that were created.
 */
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
    throw new Error("Directus: chatroom Creation failed with");
  }
}

/**
 * @description Gets all created chatrooms
 *
 * @example
 *
 * // use like this
 * try{
 *  const allChatrooms = await getAllChatRooms()
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @returns All aveilable chatrooms
 */
export async function getAllChatRooms() {
  try {
    return await directus.request(readItems("chatRooms"));
  } catch (error) {
    throw new Error(`Error fetching chatrooms`);
  }
}

/**
 * @description gets all the users in a chat room using the members table
 *
 * @example
 * try{
 *  // use like this
 *  const allusers = await getAllUsersInChatRoom(parseInt(chatRoomId));
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} chatRoomId - The concerned chatroom
 * @returns the requested users if exist
 */
export async function getAllUsersInChatRoom(chatRoomId: number) {
  try {
    const usersIdList = await directus.request(
      readItems("members", {
        filter: {
          chatRoomId: chatRoomId,
        },
        fields: ["id"],
      }),
    );
    if (usersIdList.length > 0) {
      return await directus.request(
        readItems("users", {
          filter: {
            id: {
              _in: usersIdList.map((x) => x.id),
            },
          },
        }),
      );
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error fetching chatrooms");
  }
}

/**
 * @description Get data on a spesific chatroom
 *
 * @example
 * try{
 *  // use like this
 *  const chatRoom = await getAChatRoomById(chatRoomId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} chatRoomId - Chatroom concerned
 * @returns - the chatroom concerned
 */
export async function getAChatRoomById(chatRoomId: number) {
  try {
    return await directus.request(readItem("chatRooms", chatRoomId));
  } catch (error) {
    throw new Error("Error fetching the chatroom");
  }
}

/**
 * @description update a chatroom matching the id
 *
 * @example
 * try{
 * const newChatroom = await updateChatRoomById(chatRoomId: number,chatRoomData: ChatRoomType)
 * }catch(error){
 *  console.log(error.message)
 * }
 * @param {number} chatRoomId - the chat room id
 * @param {ChatRoomType} chatRoomData - chatroom update data
 * @returns
 */
export async function updateChatRoomById(
  chatRoomId: number,
  chatRoomData: ChatRoomType,
) {
  try {
    return await directus.request(
      updateItem("chatRooms", chatRoomId, chatRoomData),
    );
  } catch (error) {
    throw new Error("Error updating the chatroom");
  }
}

/**
 * @description deletes a chatroom that matches the id
 *
 * @example
 * try{
 *  await deleteChatRoomWithId(roomId)
 * }catch(error){
 *  console.log(error.maessage)
 * }
 * @param roomId - The room id
 * @returns nothing to return
 */
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
    throw new Error("Chatroom delete failed with error:");
  }
}

/**
 * @description fetch all the users in this chatroom
 *
 * @example
 * try{
 *  const messages = await getAllMessagesInChatRoomById(roomId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} roomId - the room id
 * @returns all messages in this room
 */
export async function getAllMessagesInChatRoomById(roomId: number) {
  try {
    const roomMessages = await directus.request(readItems("messages"));
    return roomMessages.filter((x) => x.chatRoomId === roomId);
  } catch (error) {
    throw new Error("Error fetching messages for this room");
  }
}

/**
 * @description Creates a membership to this chatroom for the user sending the message
 *
 * @example
 * try{
 *  const newMessage = await createNewMessage(newMessageData)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {MessageType} newMessageData - Message data to complete for creation
 * @returns Mesage created
 */
export async function createNewMessage(newMessageData: MessageType) {
  try {
    const message = await directus.request(
      createItem("messages", {
        ...newMessageData,
        createdAt: new Date(),
        updatedAt: new Date(),
        responseToMessageId: undefined,
      }),
    );
    if (message) {
      await directus.request(
        createItem("members", {
          userId: message.senderId,
          chatRoomId: message.chatRoomId,
          roleInChatroom: "participant",
        }),
      );
      return message;
    } else {
      throw new Error("Could no create new massage an link to chat");
    }
  } catch (error) {
    throw new Error(
      "Chatroom new message creation failed with error: ${error.errors.map((x: { message: string }) => x.message)}",
    );
  }
}

/**
 * @description Deletes a message permanently, no going back
 *
 * @example
 * try{
 *  const deletedMessage = await deleteUsersMessageById(messageId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} messageId - the message's id
 * @returns nothing to return
 */
export async function deleteUsersMessageById(messageId: number) {
  try {
    return await directus.request(deleteItem("messages", messageId));
  } catch (error) {
    throw new Error(
      `Chatroom message delete failed with error: ${error.errors.map((x: { message: string }) => x.message)}`,
    );
  }
}

/**
 * @description Get data on a spesific message
 *
 * @example
 * try{
 *  // use like this
 *  const message = await getMessageById(messageId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} messageId - message concerned
 * @returns - the message concerned
 */
export async function getMessageById(messageId: number) {
  try {
    return await directus.request(readItem("messages", messageId));
  } catch (error) {
    throw new Error(`Chatroom message view failed with error:`);
  }
}

/**
 * @description update a message matching the id
 *
 * @example
 * try{
 * const updatedMessage = await updateUserMessageById(updateMessage)
 * }catch(error){
 *  console.log(error.message)
 * }
 * @param {MessageType} updateMessage - message update data
 * @returns
 */
export async function updateUserMessageById(updateMessage: MessageType) {
  const { id } = updateMessage;
  try {
    return await directus.request(updateItem("messages", id, updateMessage));
  } catch (error) {
    throw new Error(`Chatroom message update failed with error:`);
  }
}

/**
 * @description fetch all the messages in this chatroom
 *
 * @example
 * try{
 *  const messages = await getAllMessagesInChatRoomById(roomId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} chatRoomId - the room id
 * @returns all messages in this room
 */
export async function getMessageAllFomChatroomById(chatRoomId: number) {
  try {
    return await directus.request(
      readItems("messages", {
        filter: {
          chatRoomId: chatRoomId,
        },
      }),
    );
  } catch (error) {
    throw new Error(`Chatroom messages view failed with error:`);
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
      }),
    );
  } catch (error) {
    throw new Error(`Could not create user`);
  }
}

/**
 * @description update a user matching the id
 *
 * @example
 * try{
 * const updatedUser = await updateDataOnUserById(userId, userData)
 * }catch(error){
 *  console.log(error.message)
 * }
 * @param {number} userId - the chat room id
 * @param {UserType} userData - user update data
 * @returns updated user
 */
export async function updateDataOnUserById(userId: number, userData: UserType) {
  try {
    return await directus.request(updateItem("users", userId, userData));
  } catch (error) {
    throw new Error(`Could not update user`);
  }
}

/**
 * @description Get data on a spesific user using the email address
 *
 * @example
 * try{
 *  // use like this
 *  const user = await getDataOnUserWithEmail(emai)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {string} email - user email concerned
 * @returns - the user concerned
 */
export async function getDataOnUserWithEmail(email: string) {
  try {
    return await directus.request(
      readItems("users", { search: email, limit: 1 }),
    );
  } catch (error) {
    throw new Error(`Could not get user data`);
  }
}

/**
 * @description gets all registered the users
 *
 * @example
 * try{
 *  // use like this
 *  const allusers = await getAllUsersData();
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @returns {UserType[]} the requested users if exist
 */
export async function getAllUsersData() {
  try {
    return await directus.request(readItems("users"));
  } catch (error) {
    throw new Error(`Could not get all users`);
  }
}

/**
 * @description Get data on a spesific user
 *
 * @example
 * try{
 *  // use like this
 *  const user = await getDataOnUserById(userId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} userId - message concerned
 * @returns - the user concerned
 */
export async function getDataOnUserById(userId: number) {
  try {
    return await directus.request(readItem("users", userId));
  } catch (error) {
    throw new Error(`Could not get user`);
  }
}

/**
 * @description Deletes a user permanently, no going back
 *
 * @example
 * try{
 *  const deletedUser = await deleteUsersAccountById(userId)
 * }catch(error){
 *  console.log(error.message)
 * }
 *
 * @param {number} userId - the user's id
 * @returns nothing to return
 */
export async function deleteUsersAccountById(userId: number) {
  try {
    return await directus.request(deleteItem("users", userId));
  } catch (error) {
    throw new Error(`Could not delete user`);
  }
}
