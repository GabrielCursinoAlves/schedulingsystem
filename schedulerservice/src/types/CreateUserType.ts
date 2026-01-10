import {SchemaCreateUserRouter} from "../schema/zod/CreateUserSchema.ts";
import { FastifyRequest } from "fastify";
import {z} from "zod";

export type SchemaCreateUserController = z.infer<typeof SchemaCreateUserRouter>;
export type Request<T> = FastifyRequest<{Body:T}>;