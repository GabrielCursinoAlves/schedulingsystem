import { ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { SchemaSession } from "../schema/zod/SessionSchema.ts";
import { ControllerSystem } from "../controller/index.ts";

export const createSessionRouter = async(app: ControllerZodInstance) => {
  
  app.post("/login", { schema: {body: SchemaSession} }, new ControllerSystem.CreateSession().handle);
  
};