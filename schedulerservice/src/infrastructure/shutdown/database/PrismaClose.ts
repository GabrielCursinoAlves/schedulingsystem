import type { ControllerZodInstance } from "@/types/zod/InstanceZodType.js";
import { prisma } from "@/config/prisma/Connection.js";

export const dbClose = (app: ControllerZodInstance) => {
  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
}; 