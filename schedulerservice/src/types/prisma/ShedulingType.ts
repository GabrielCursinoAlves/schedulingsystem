import { Prisma } from "../../../generated/prisma/client.js";

type BaseSheduling = {
  recurrence_pattern: string,
  payload:  Prisma.JsonValue,
  userId: string,
  run_at: Date
};

export type SchedulingPayload = {
  userId: string,
  phone: string,
  jobId: string
};

export type SchedulingParams = Omit<BaseSheduling, "payload"> & {
  payload: Prisma.InputJsonValue
}

export type SchedulingReturns = Prisma.ScheduledJobGetPayload<{}> & {
  phone: string,
  event: string
}
