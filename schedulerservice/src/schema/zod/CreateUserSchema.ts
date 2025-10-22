import {z} from "zod";

const PhoneSchema = z.string().min(10).max(15).regex(/^\+?\d{10,15}$/);

export const SchemaCreateUser = {
  schema:{
    body: z.object({
      username: z.string(),
      phone: PhoneSchema,
      password: z.string()
    })
  }
}