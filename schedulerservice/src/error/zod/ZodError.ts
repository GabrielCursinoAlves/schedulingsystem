import { ZodError } from "zod";

export class ZodValidationError extends Error {
  statusCode: number;
  issues:any[];
  constructor(error: ZodError) {
    super("ValidationFailed");
    this.name = 'ZodValidationError';
    this.statusCode = 400;
    this.issues = error.issues;
  }
}