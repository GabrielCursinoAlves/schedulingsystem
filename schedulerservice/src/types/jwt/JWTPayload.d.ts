import type { JwtPayload } from "jsonwebtoken";

declare module 'fastify' {
  interface FastifyRequest {
    user: jwt.JwtPayload;
  }
}

//export type JwtPayloadReturn = string | JwtPayload;