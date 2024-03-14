import { z } from "zod";

export const userSchema = z
  .object({
    id: z.number(),
    userName: z.string(),
    email: z.string(),
    password: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-{}/?\|'":;.,=])[a-zA-Z\d!@#$%^&*()_+-{}/?\|'":;.,=]{8,}$/,
        ),
        "Provide a valide password",
      ),
    role: z.string(),
    profilePicture: z.string(),
    verified: z.string(),
    lastLogin: z.date(),
    status: z.string(),
  })
  .required({
    userName: true,
    email: true,
    password: true,
  })
  .partial({
    id: true,
    role: true,
    profilePicture: true,
    verified: true,
    lastLogin: true,
    status: true,
  });

export default userSchema;
