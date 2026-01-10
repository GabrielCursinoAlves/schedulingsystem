import {ApplicationError, NotFoundError, UnauthorizedError, ValidationError} from "./ApplicationError.ts";
import {ZodValidationError} from "./zod/ZodError.ts";

export const ErrorSystem = {
  "UnauthorizedError": UnauthorizedError,
  "ApplicationError": ApplicationError,
  "ValidationError": ValidationError,
  "NotFound": NotFoundError
};

export const ErrorValidation = {
  "ZodValidationError": ZodValidationError
};