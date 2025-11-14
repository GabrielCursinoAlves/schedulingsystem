import { FastifyRequest } from "fastify";

export type Request<T> = FastifyRequest<{Body:T}>;