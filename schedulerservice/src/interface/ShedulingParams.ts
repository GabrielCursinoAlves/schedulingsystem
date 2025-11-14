import { Prisma } from "@prisma/client";

interface BaseSheduling {
  userId: string,
  run_at: Date,
  recurrence_pattern: string
};

export interface SchedulingParams extends BaseSheduling {
  payload: Prisma.InputJsonValue,
}

export interface ShedulingReturns extends BaseSheduling {
  id: string,
  payload: Prisma.JsonValue,
  is_recurring: boolean,
  created_at: Date
}