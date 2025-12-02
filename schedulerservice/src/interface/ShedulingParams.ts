import { Prisma } from "../generated/prisma/client.ts";

interface BaseSheduling {
  run_at: Date,
  userId: string,
  recurrence_pattern: string
  payload: Prisma.InputJsonValue
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

export interface SchedulingParams extends BaseSheduling {}

export interface ShedulingReturns extends Omit<BaseSheduling, "payload">{
  id: string,
  created_at: Date,
  is_recurring: boolean,
  payload: Prisma.JsonValue,
  dataAdditional: SchedulingMetadata
}