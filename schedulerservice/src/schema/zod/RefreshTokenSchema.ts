import { z } from "zod";

export const SchemaRefreshToken = z.object({
  refreshToken: z.string().uuid()
});