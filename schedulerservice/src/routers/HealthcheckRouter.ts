import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { prisma } from "@/config/prisma/Connection.js";
import { FastifyRequest, FastifyReply } from "fastify";

export const CreateHealthcheck = (app: ControllerZodInstance) => {

  app.get("/health/live", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ status: "connect" });
  });

  app.get("/health/ready", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
       reply.status(200).send({ status: "ready" });
    } catch (error) {
       reply.status(503).send({ status: "not ready" });
    }
  });

}