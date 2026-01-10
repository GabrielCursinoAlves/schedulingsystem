import {SchemaCreateSystem} from "../schema/zod/CreateSchedulingSystemSchema.ts";
import {ControllerSystem} from "../controller/index.ts";
import {FastifyInstance} from "fastify";

export const CreateSchedulingRouter = async(app:FastifyInstance) => {

  app.post("/CreateSchedulingSystem", {schema: {body: SchemaCreateSystem}}, new ControllerSystem.CreateSchedulingSystem().handle);

}