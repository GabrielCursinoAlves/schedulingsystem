import { SchemaCreateSystemRouter } from "../schema/zod/CreateSchedulingSystemSchema.ts";
import type { ControllerZodInstance } from "../types/zod/InstanceZodType.ts";
import { ControllerSystem } from "../controller/index.ts";

export const CreateSchedulingRouter = async(app:ControllerZodInstance) => {

  app.post("/CreateSchedulingSystem", { schema: {body: SchemaCreateSystemRouter} }, new ControllerSystem.CreateSchedulingSystem().handle);

};