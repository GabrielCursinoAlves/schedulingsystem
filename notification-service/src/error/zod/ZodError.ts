import { ZodError } from "zod";

export class ZodValidationError extends Error {
  statusCode: number;
  issues: any[];
  constructor(error: ZodError) {
    super("ValidationFailed");
    this.name = 'ZodValidationError';
    this.statusCode = 400;
    this.issues = error.issues;
  }
}

export class MalformedPayloadError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'MalformedPayloadError';
    this.statusCode = 400;
  }
}