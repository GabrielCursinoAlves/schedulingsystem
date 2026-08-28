import { RestException } from "twilio";

export function TwilioRestException(error: unknown): error is RestException {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "status" in error &&
    "message" in error
  );
}