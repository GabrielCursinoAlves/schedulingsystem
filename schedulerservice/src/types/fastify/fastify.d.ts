import type { JwtPayload } from "@/types/jwt/JWTypes.ts";

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload;
  }
}