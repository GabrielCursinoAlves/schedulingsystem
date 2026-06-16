import type {ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { SchemaCreateUserRouter } from "@/schema/zod/CreateUserSchema.js";
import { ControllerSystemDi } from "@/infrastructure/container/index.js";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", { schema: {body: SchemaCreateUserRouter} }, ControllerSystemDi.createUser.handle);

}