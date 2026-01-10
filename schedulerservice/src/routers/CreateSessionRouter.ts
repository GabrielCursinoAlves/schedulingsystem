import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { SchemaSession } from "@/schema/zod/SessionSchema.js";
import { ControllerSystem } from "@/controller/index.js";

export const createSessionRouter = async(app: ControllerZodInstance) => {
  
  app.post("/login", { schema: {body: SchemaSession} }, new ControllerSystem.CreateSession().handle);
  
};