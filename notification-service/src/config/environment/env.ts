import { required, toNumber } from "./validation/EnvPatternValidation.js";

export const Env = {
  PORT: toNumber("PORT"),
  HOST: required("HOST"),
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  MAX_RETRY_DELAY: toNumber("MAX_RETRY_DELAY"),
  MAX_RETRY_COUNT : toNumber("MAX_RETRY_COUNT")
};