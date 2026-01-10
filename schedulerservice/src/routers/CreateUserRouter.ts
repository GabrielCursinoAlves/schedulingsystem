import type {ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { SchemaCreateUserRouter } from "@/schema/zod/CreateUserSchema.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";
import { ControllerSystem } from "@/controller/index.js";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", { preHandler: [AuthSession], schema: {body: SchemaCreateUserRouter} }, new ControllerSystem.CreateUser().handle);

}