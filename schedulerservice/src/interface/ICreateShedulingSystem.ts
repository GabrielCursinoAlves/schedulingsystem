import { SchedulingParams, SchedulingReturns } from "@/types/prisma/ShedulingType.js";
import { Prisma } from "@generated/prisma/client.js";

export interface ICreateShedulingSystem {
  execute: (data: SchedulingParams, tx: Prisma.TransactionClient) => Promise<SchedulingReturns>;
};