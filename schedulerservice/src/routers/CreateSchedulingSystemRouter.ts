import {FastifyInstance} from "fastify";

import {SchemaCreateSystem} from "../schema/zod/CreateSchedulingSystemSchema.ts";
import {ControllerSystem} from "../controller/index.ts";

export const CreateSchedulingRouter = async(app:FastifyInstance) => {

  app.post("/CreateSchedulingSystem", SchemaCreateSystem, new ControllerSystem.CreateSchedulingSystem().handle);

}