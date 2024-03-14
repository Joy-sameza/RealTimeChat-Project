import { z } from "zod";

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
