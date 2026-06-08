import { OutboxParams } from "@/types/prisma/OutboxType.js";
import { Prisma } from "@generated/prisma/client.js";

export interface ICreateOutbox {
  execute: (data: OutboxParams, tx: Prisma.TransactionClient) => Promise<void>;
};