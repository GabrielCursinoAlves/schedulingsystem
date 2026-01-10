import {ApplicationError, NotFoundError} from "./ApplicationError.ts";
import {PrismaUniqueViolationError} from "./prisma/PrismaError.ts";
import {ZodValidationError} from "./zod/ZodError.ts";

export const ErrorSystem = {
  "PrismaUniqueViolation": PrismaUniqueViolationError,
  "ApplicationError": ApplicationError,
  "NotFound": NotFoundError
};

export const ErrorValidation = {
  "ZodValidationError": ZodValidationError
};