import { Prisma } from "../../generated/prisma/client.js";

interface BaseSheduling {
  run_at: Date,
  userId: string,
  recurrence_pattern: string
  payload:  Prisma.JsonValue
};

export interface SchedulingMetadata {
  phone: string,
  event_type: string,
  aggregate_type: string
}

export interface SchedulingPayload {
  jobId: string,
  phone: string,
  userId: string
};

export interface SchedulingParams extends Omit<BaseSheduling, "payload"> {
  payload: Prisma.InputJsonValue
}

export interface ShedulingReturns extends BaseSheduling {
  id: string,
  created_at: Date,
  is_recurring: boolean,
  dataAdditional: SchedulingMetadata
}