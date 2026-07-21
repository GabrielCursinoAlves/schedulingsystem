import {ApplicationError, ConflictError, NotFoundError, TooManyRequestsError, UnauthorizedError, ValidationError} from "./ApplicationError.js";
import {MalformedPayloadError, ZodValidationError} from "./zod/ZodError.js";

export const ErrorSystem = {
  "TooManyRequestsError": TooManyRequestsError,
  "UnauthorizedError": UnauthorizedError,
  "ApplicationError": ApplicationError,
  "ValidationError": ValidationError,
  "ConflictError": ConflictError,
  "NotFound": NotFoundError
};

export const ErrorValidation = {
  "ZodValidationError": ZodValidationError,
  "MalformedPayloadError": MalformedPayloadError
};