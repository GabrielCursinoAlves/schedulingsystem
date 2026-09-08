import { PhoneSchema } from "./PhoneSchema.js";
import { z } from "zod";

export const SchemaCreateUserRouter = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  email_alert: z.email(),
  phone: PhoneSchema,
  email: z.email()
})
