import { z } from "zod";

export const SchemaSession = z.object({
  email: z.string().min(3),
  password: z.string()
});