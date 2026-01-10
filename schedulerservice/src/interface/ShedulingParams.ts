import { Prisma } from "@prisma/client";

interface BaseSheduling {
  run_at: Date,
  userId: string,
  recurrence_pattern: string
};

export interface SchedulingParams extends BaseSheduling {
  payload: Prisma.InputJsonValue,
}

export interface ShedulingReturns extends BaseSheduling {
  id: string,
  created_at: Date,
  is_recurring: boolean,
  payload: Prisma.JsonValue,
  dataPayload: {
    aggregate_type: string,
    event_type: string
    phone: string,
  }
}