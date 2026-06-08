import { SchemaCreateSystemRouter } from "@/schema/zod/CreateSchedulingSystemSchema.js";
import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { ControllerSystemDi } from "@/infrastructure/container/index.js";
import { AuthSession } from "@/lib/middleware/AuthSession.js";

export const CreateSchedulingRouter = async(app:ControllerZodInstance) => {

  app.post("/CreateSchedulingSystem", { preHandler: [AuthSession],  schema: {body: SchemaCreateSystemRouter} }, ControllerSystemDi.createScheduling.handle);

};