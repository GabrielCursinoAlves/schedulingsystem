import { TwilioRestException } from "@/lib/twilio/TwilioRestException.js";
import { ISenderNotification } from "@/interface/ISenderNotication.js";
import { MockRequestClient } from "@/test/MockRequestClient.js";
import { SenderType } from "@/types/zod/SenderType.js";
import { Env } from "@/config/environment/env.js";
import { SchemaTypeZod } from "@/types/index.js";
import twilio, { Twilio } from "twilio";

export class TwilioService implements ISenderNotification{
  private retryCodeStatus = [ 429, 500, 502, 503, 504 ];
  private client: Twilio;

  constructor() { this.client = twilio(Env.TWILIO_ACCOUNT_SID, Env.TWILIO_AUTH_TOKEN); }

  async send(data: SchemaTypeZod["SchemaSender"]): Promise<SenderType> {
    return await this.sendAttempt(data, 0);
  }

  private async sendAttempt(data: SchemaTypeZod["SchemaSender"], attempt: number): Promise<SenderType> {
    if(!data.phone) { 
      return {success: false, errorMessage:  { message: "Phone number is required to send SMS." }};
    }

    try {  
      await this.client.messages.create({
        to: data.phone,
        from: Env.TWILIO_PHONE_NUMBER,
        body: data.message
      });
  
      return { success: true };

    } catch (error) {
      if(TwilioRestException(error) && error.status !== null && this.retryCodeStatus.includes(error.status) && attempt < Env.TWILIO_MAX_RETRIES) {
        await this.retrySend(attempt);
        attempt++;

        return await this.sendAttempt(data, attempt);
      }
     
      return { 
        success: false, 
        errorMessage: {
          message: error instanceof Error ? error.message : "Failed to send SMS",
          status: TwilioRestException(error) ? error.status : undefined,
          timestamp: new Date(),
          attempt
        } 
      };
    }
  }

  private retrySend(attempt: number): Promise<void> {
    const baseDelay = Math.min(2000 * 2 ** attempt, Env.TWILIO_MAX_RETRY_DELAY);
    const jitter = Math.random() * 1000;

    const delay = baseDelay + jitter;
  
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

}