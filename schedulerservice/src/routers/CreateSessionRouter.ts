import { ControllerSystemDi } from "@/infrastructure/container/index.js";
import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { SchemaSession } from "@/schema/zod/SessionSchema.js";

export const createSessionRouter = async(app: ControllerZodInstance) => {
  
  app.post("/login", { schema: {body: SchemaSession} }, ControllerSystemDi.createSession.handle);
  
};