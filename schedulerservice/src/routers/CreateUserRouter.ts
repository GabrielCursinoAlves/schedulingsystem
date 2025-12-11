import type {ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import { AuthSession } from "../lib/middleware/AuthSession.ts";
import { ControllerSystem } from "../controller/index.ts";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", { preHandler: [AuthSession], schema: {body: SchemaCreateUserRouter} }, new ControllerSystem.CreateUser().handle);

}