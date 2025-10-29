import { SchemaCreateUserRouter } from "../schema/zod/CreateUserSchema.ts";
import type {ControllerZodInstance} from "../types/ErrorZodType.ts";
import { ControllerSystem } from "../controller/index.ts";

export const CreateUserRouter = async(app: ControllerZodInstance) => {

  app.post("/CreateUser", {schema: {body: SchemaCreateUserRouter}}, new ControllerSystem.CreateUser().handle);

}