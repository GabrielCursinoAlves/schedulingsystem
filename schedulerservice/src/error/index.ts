import {PrismaUniqueViolationError} from "./prisma/PrismaError.ts";
import {AppError, NotFoundError} from "./AppError.ts";

export const ErrorSystem = {
  "PrismaUniqueViolation": PrismaUniqueViolationError,
  "NotFound": NotFoundError,
  "AppError": AppError
};