import { z } from "zod";

/**
 * @description Chatroom data validation schema stating that the name, authorId, and description are required
 */
export const chatRoomSchema = z
  .object({
    name: z.string(),
    authorId: z.number(),
    description: z.string(),
  })
  .required({
    name: true,
    authorId: true,
    description: true,
  });

export default chatRoomSchema;
