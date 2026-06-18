import {ApplicationError, NotFoundError, UnauthorizedError, ValidationError} from "./ApplicationError.js";
import {ZodValidationError} from "./zod/ZodError.js";

export const ErrorSystem = {
  "UnauthorizedError": UnauthorizedError,
  "ApplicationError": ApplicationError,
  "ValidationError": ValidationError,
  "NotFound": NotFoundError
};

export const ErrorValidation = {
  "ZodValidationError": ZodValidationError
};