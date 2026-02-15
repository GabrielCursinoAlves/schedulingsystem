import { z } from "zod";

export const SchemaRefreshToken = z.object({
  refreshToken: z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, "jwt invalid")
});