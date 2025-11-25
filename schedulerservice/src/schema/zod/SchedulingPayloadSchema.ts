import { z } from "zod";

const SendSmsPayload = z.object({
  type: z.literal("send_sms"),
  message: z.string()
});

const SendAlertPayload = z.object({
  type: z.literal("send_alert"),
  message: z.string(),
  severity: z.enum(["low", "medium"], "high").default("medium")
});

export const SchemaSendPayload = z.discriminatedUnion("type", [
  SendSmsPayload,
  SendAlertPayload
]);