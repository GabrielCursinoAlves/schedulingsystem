import { z } from "zod";

export const SchemaLogin = z.object({
  username: z.string().min(3),
  password: z.string()
});