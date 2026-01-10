import {FastifyInstance} from "fastify";

import { SchemaCreateUser } from "../schema/zod/CreateUserSchema.ts";
import { ControllerSystem } from "../controller/index.ts";

export const CreateUserRouter = async(app:FastifyInstance) => {

  app.post("/CreateUser", SchemaCreateUser, new ControllerSystem.CreateUser().handle);

}