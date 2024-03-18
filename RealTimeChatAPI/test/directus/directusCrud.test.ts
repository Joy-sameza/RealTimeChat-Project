import { describe, expect, it } from "vitest";
import {
  // createNewChatRoom,
  createNewMessage,
  updateUserMessageById,
} from "../../src/directus/directusCrud.js";
import { MessageType } from "../../src/interface/dataTypes.js";

describe("directuse operations test", () => {
  const testList = [
    {
      name: "Create a message",
      function: createNewMessage,
      data: {
        content: "my chatroom message",
        senderId: 1,
        chatRoomId: 1,
      },
    },
    {
      name: "Create a message",
      function: updateUserMessageById,
      data: {
        id: 1,
        content: "my message update content",
        createdAt: new Date(),
        updatedAt: new Date(),
        responseToMessageId: null,
      },
    },
    // {
    //   name: "Create a chatRoom",
    //   function: createNewChatRoom,
    //   data: {
    //     name: "my chatroom content",
    //     description: "my chatroom description",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     responseToMessageId: null,
    //   },
    // },
  ];

  testList.forEach((test) => {
    it(`Should ${test.name}`, () => {
      const respons = test.function(test.data as unknown as MessageType);
      expect(respons).toBeDefined();
    });
  });
});
