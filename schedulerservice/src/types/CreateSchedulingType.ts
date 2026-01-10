import {SchemaCreateSystemRouter} from "../schema/zod/CreateSchedulingSystemSchema.ts";
import { FastifyRequest } from "fastify";
import {z} from "zod";

export type SchemaCreateSchedulingController = z.infer<typeof SchemaCreateSystemRouter>;
export type Request<T> = FastifyRequest<{Body:T}>;