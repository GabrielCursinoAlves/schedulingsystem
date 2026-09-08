import { Prisma } from "../../../generated/prisma/client.js";

type BaseSheduling = {
  recurrence_pattern: string,
  payload:  Prisma.JsonValue,
  userId: string,
  run_at: Date
};

export type SchedulingPayload = {
  email_alert: string,
  userId: string,
  phone: string,
  jobId: string
};

export type SchedulingParams = Omit<BaseSheduling, "payload"> & {
  payload: Prisma.InputJsonValue
}

export type SchedulingReturns = Prisma.ScheduledJobGetPayload<{}> & {
  email_alert: string,
  phone: string,
  event: string
}
