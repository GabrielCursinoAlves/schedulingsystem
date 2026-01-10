import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { FastifyRequest, FastifyReply } from "fastify";

export const CreateHealthcheck = (app: ControllerZodInstance) => {

  app.get("/health", async (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ status: "ok" });
  });

}