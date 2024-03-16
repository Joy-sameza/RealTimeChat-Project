import { z } from "zod";

/**
 * @description message data validation schema stating that the content, senderId and chatRoomId are required.
 */
export const messageSchema = z
  .object({
    content: z.string(),
    senderId: z.number(),
    chatRoomId: z.number(),
  })
  .required({
    content: true,
    senderId: true,
    chatRommId: true,
  });

export default messageSchema;
