import { z } from "zod";

/**
 * @description User login data validation schema stating that the email and password are required with the password passing this regular expression check
 */
export const loginSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-{}/?\|'":;.,=])[a-zA-Z\d!@#$%^&*()_+-{}/?\|'":;.,=]{8,}$/,
        ),
        "Provide a valide password",
      ),
  })
  .required({
    email: true,
    password: true,
  });

export default loginSchema;
