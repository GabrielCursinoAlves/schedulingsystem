import type {ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { ControllerSystemDi } from "@/infrastructure/container/index.js";
import { SchemaCreateUserRouter } from "@/schema/zod/CreateUserSchema.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", { preHandler: [AuthSession], schema: {body: SchemaCreateUserRouter} }, ControllerSystemDi.createUser.handle);

}