import { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { prisma } from "@/infrastructure/database/prisma/Connection.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { Env } from "@/config/environment/env.js";
import amqp from "amqplib";

export const CreateHealthcheck = (app: ControllerZodInstance) => {

  app.get("/health/live", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ status: "Application connect" });
  });

  app.get("/health/ready", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;

      const con = await amqp.connect(Env.RABBITMQ_URL);
      await con.close();

       reply.status(200).send({ 
        status: "ready",
        services: {
          postgres: "up",
          rabbitMQ: "up"
        } 
      });

    } catch (error) {
       reply.status(503).send({ 
        status: "not ready",
        services: {
          postgres: "unknown",
          rabbitMQ: "down"
        } 
      });
    }
  });

}