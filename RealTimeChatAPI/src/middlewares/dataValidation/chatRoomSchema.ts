import { z } from "zod";

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
