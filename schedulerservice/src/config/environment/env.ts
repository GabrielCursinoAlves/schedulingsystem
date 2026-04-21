import { required, toNumber, toExpires } from "./validation/EnvPatternValidation.js";

export const Env = {
  PORT:toNumber("PORT"),
  HOST: required("HOST"),
  SECRET_KEY: required("SECRET_KEY"),
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  MAX_RETRY_DELAY: toNumber("MAX_RETRY_DELAY"),
  DELAY_TTL_RABBITMQ: toNumber("DELAY_TTL_RABBITMQ"),
  ACESS_TOKEN_EXPIRES: toExpires("ACESS_TOKEN_EXPIRES"),
  REFRESH_TOKEN_EXPIRES: toExpires("REFRESH_TOKEN_EXPIRES")
};