import { z } from "zod";

/**
 * @description User update data validation schema stating that the role, profilepicture, and verified are required.
 */
export const updateUserSchema = z
  .object({
    role: z.string(),
    profilePicture: z.string(),
    verified: z.string(),
  })
  .partial({
    id: true,
    role: true,
    profilePicture: true,
    verified: true,
  });

export default updateUserSchema;
