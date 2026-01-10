import { SchemaCreateSystemRouter } from "@/schema/zod/CreateSchedulingSystemSchema.js";
import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";
import { ControllerSystem } from "@/controller/index.js";

export const CreateSchedulingRouter = async(app:ControllerZodInstance) => {

  app.post("/CreateSchedulingSystem", { preHandler: [AuthSession],  schema: {body: SchemaCreateSystemRouter} }, new ControllerSystem.CreateSchedulingSystem().handle);

};