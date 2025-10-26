import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import { ControllerSystem } from "../controller/index.ts";
import {FastifyInstance} from "fastify";

export const CreateUserRouter = async(app:FastifyInstance) => {

  app.post("/CreateUser", {schema: {body: SchemaCreateUserRouter}}, new ControllerSystem.CreateUser().handle);

}