import type {ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import { ControllerSystem } from "../controller/index.ts";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", {schema: {body: SchemaCreateUserRouter}}, new ControllerSystem.CreateUser().handle);

}