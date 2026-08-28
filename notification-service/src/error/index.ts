import {ApplicationError, ConflictError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnavailableError, ValidationError} from "./ApplicationError.js";
import {MalformedPayloadError, ZodValidationError} from "./zod/ZodError.js";

export const ErrorSystem = {
  "TooManyRequestsError": TooManyRequestsError,
  "UnauthorizedError": UnauthorizedError,
  "UnavailableError": UnavailableError,
  "ApplicationError": ApplicationError,
  "ValidationError": ValidationError,
  "ConflictError": ConflictError,
  "NotFoundError": NotFoundError
};

export const ErrorValidation = {
  "ZodValidationError": ZodValidationError,
  "MalformedPayloadError": MalformedPayloadError
};