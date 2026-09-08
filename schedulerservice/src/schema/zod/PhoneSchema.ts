import { z } from "zod";

export const PhoneSchema = z.string().superRefine((phone, ctx) => {
  if (!/^[+\d]+$/.test(phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `The phone number provided (${phone}) contains invalid characters. Use only numbers, with a + sign at the beginning.`,
    });
    return;
  }

  if(!phone.startsWith("+")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `The phone number provided (${phone}) must start with the + sign. Please enter it in the format: +${phone}`
    });
    return;
  }
  if(!/^\+55[1-9]{2}9?\d{8}$/.test(phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `The phone number provided (${phone}) is not in a valid format. Expected format: +55DDD9XXXXXXXX`
    });
    return;
  }
});