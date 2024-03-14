import { Socket } from "socket.io";
import {
  createNewMessage,
  createNewChatRoom,
  deleteChatRoomWithId,
  deleteUsersMessageById,
} from "../directus/directusCrud.js";

function realTimeChatManagment(socket: Socket) {
  /**
   * This event is triggered when a regular user creates a new chatroom
   * This action sends back an acknowledgment to the user on successfull creation of the chatroom
   */
  socket.on("createRoom", async (newRoomData, callBack) => {
    await createNewChatRoom(newRoomData)
      .then((newRoom) => {
        callBack(`${newRoom.name} was created`);
      })
      .catch((errorCreatingRoom) => {
        throw errorCreatingRoom;
      });
  });

  /**
   * This Event is triggered when the creator of a chatroom deletes the chatroom he created
   * This action sends back an acknowledgment on successfull deletion of the chatroom
   */
  socket.on("deleteRoom", async (roomId, callBack) => {
    await deleteChatRoomWithId(roomId)
      .then(() => {
        callBack("Room Deleted");
      })
      .catch((errorDeletingRoom) => {
        throw errorDeletingRoom;
      });
  });

  /**
   * This event is triggered when a user requests to join an existing chatroom
   * A massage is brodcasted in the room upon succesfull joining of the user to the chatroom
   */
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("has Joined room");
  });

  /**
   * This event is triggered when a member of a chatroom leaves the room
   * A massage is brodcasted in the room when a member of the chatroom succesfull leaves the chatroom
   */
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit("has left chat");
  });

  /**
   * This event is triggered when a member that has joined a group sends a message in that group
   * The user recives and acknowledgement upon successfull submition of the message to all users in the room.
   */
  socket.on("newMessage", async (newMessageData, callBack) => {
    const { chatroomId, content } = newMessageData;
    await createNewMessage(newMessageData)
      .then(() => {
        socket
          .to(chatroomId)
          .emitWithAck(content)
          .then(() => {
            callBack(`message submited`);
          });
      })
      .catch((addNewMessageError) => {
        throw addNewMessageError;
      });
  });

  /**
   * This event is triggered when a member that has joined a group deletes a message he sent in that group
   * The user recives and acknowledgement upon successfull submition of the message to all users in the room.
   */
  socket.on("deleteMessage", async (messageId, userId, callBack) => {
    await deleteUsersMessageById(messageId)
      .then(() => {
        callBack("message was deleted");
      })
      .catch((deleteMessageError) => {
        throw deleteMessageError;
      });
  });
}

export default realTimeChatManagment;
