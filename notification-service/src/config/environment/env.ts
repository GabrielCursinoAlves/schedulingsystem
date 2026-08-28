import { required, toNumber } from "./validation/EnvPatternValidation.js";

export const Env = {
  PORT: toNumber("PORT"),
  HOST: required("HOST"),
  DATABASE_URL: required("DATABASE_URL"),
  RABBITMQ_URL: required("RABBITMQ_URL"),
  MAX_RETRY_DELAY: toNumber("MAX_RETRY_DELAY"),
  MAX_RETRY_COUNT : toNumber("MAX_RETRY_COUNT"),
  TWILIO_AUTH_TOKEN: required("TWILIO_AUTH_TOKEN"),
  TWILIO_ACCOUNT_SID: required("TWILIO_ACCOUNT_SID"),
  TWILIO_MAX_RETRIES: toNumber("TWILIO_MAX_RETRIES"),
  TWILIO_PHONE_NUMBER: required("TWILIO_PHONE_NUMBER"),
  TWILIO_MAX_RETRY_DELAY: toNumber("TWILIO_MAX_RETRY_DELAY")
};