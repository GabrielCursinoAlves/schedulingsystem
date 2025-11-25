import { z } from "zod";

const PhoneSchema = z.string().min(10).max(15).regex(/^\+?\d{10,15}$/);

export const SchemaCreateUserRouter = z.object({
  username: z.string().min(3),
  phone: PhoneSchema,
  password: z.string().min(8)
});
