import { z } from "zod";

export const updateUserSchema = z
  .object({
    role: z.string(),
    profilePicture: z.string(),
    verified: z.string(),
    lastLogin: z.date(),
    status: z.string(),
  })
  .partial({
    id: true,
    role: true,
    profilePicture: true,
    verified: true,
    lastLogin: true,
    status: true,
  });

export default updateUserSchema;
