import { ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { SchemaLogin } from "../schema/zod/LoginSchema.ts";
import { ControllerSystem } from "../controller/index.ts";

export const createLoginRouter = async(app: ControllerZodInstance) => {
  
  app.post("/login", { schema: {body: SchemaLogin} }, new ControllerSystem.CreateLoginController().handle);
  
};