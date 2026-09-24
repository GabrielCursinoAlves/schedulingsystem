import { ISenderNotification } from "@/interface/ISenderNotication.js";
import { SenderType } from "@/types/zod/SenderType.js";
import { Env } from "@/config/environment/env.js";
import { SchemaTypeZod } from "@/types/index.js";
import { Resend } from "resend";

export class GmailService implements ISenderNotification {
  private retryCodeStatus = [ 429, 500, 502, 503, 504 ];
  private resendClient: Resend;

  constructor() { this.resendClient = new Resend(Env.RESEND_AUTH_TOKEN); }

  async send(data: SchemaTypeZod["SchemaSender"]): Promise<SenderType> {
    return this.sendAttempt(data, 0);
  }

  private async sendAttempt(data: SchemaTypeZod["SchemaSender"], attempt: number): Promise<SenderType> {
    if(!data.email_alert) {
      return { success: false, errorMessage: { message: "Email alert is not supported." } };
    }

    try {
      const { data: resendData, error } = await this.resendClient.emails.send({
        from: Env.RESEND_FROM_EMAIL,
        to: [data.email_alert],
        subject: "Notification Alert",
        html: `<p>${data.message}</p>`,
      });

      if (error) {
        if (error.statusCode && this.retryCodeStatus.includes(error.statusCode) && attempt < Env.RESEND_MAX_RETRIES) {
          await this.retrySend(attempt);
          attempt++;

          return this.sendAttempt(data, attempt);
        }

        return { 
          success: false, 
          errorMessage: {
            message: error.message ?? "Failed to send E-mail",
            status: error.statusCode ? error.statusCode : undefined,
            timestamp: new Date(),
            attempt
          } 
        };
      }

      return { 
        success: true, 
        errorMessage: {
          attempt
        } 
      };

    } catch (error) {
      if (attempt < Env.RESEND_MAX_RETRIES) {
        await this.retrySend(attempt);
        attempt++;

        return this.sendAttempt(data, attempt);
      }

      return { success: false, errorMessage: { message: "Failed to send email." } };
    }
  }

  private retrySend(attempt: number): Promise<void> {
    const baseDelay = Math.min(2000 * 2 ** attempt, Env.RESEND_MAX_RETRY_DELAY);
    const jitter = Math.random() * 1000;

    const delay = baseDelay + jitter;
  
    return new Promise((resolve) => setTimeout(resolve, delay));
  };
}