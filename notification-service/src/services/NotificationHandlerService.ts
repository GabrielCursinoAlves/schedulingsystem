import { ICreateNotification, INotificationHandler } from "@/interface/ICreateNotification.js";
import { ISenderNotification } from "@/interface/ISenderNotication.js";
import { SchemaTypeZod } from "@/types/index.js";
import { ErrorSystem } from "@/error/index.js";

export class NotificationHandler implements INotificationHandler {
  
  constructor(
    private readonly createNotification: ICreateNotification,
    private readonly gmailSender: ISenderNotification,
    private readonly smsSender: ISenderNotification,
  ) {}

  async execute(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<void> {
    const { id, phone, message, severity } = await this.createNotification.create(data);

    try {
      const senderService = this.defineSender(data.event);
      const sendResult = await senderService.send({
        ...( severity && { severity }),
        ...( phone && { phone }),
        message
      });

      if(sendResult.success) {
        return await this.createNotification.update(id, {
          processed_at: new Date(),
          status:"sent"
        });
      }

      return await this.createNotification.update(id, {
        error_reason: JSON.stringify(sendResult.errorMessage),
        attempt: sendResult.errorMessage?.attempt,
        status: "failed"
      });

    } catch (error) {
      if(error instanceof ErrorSystem.ApplicationError) {
        return await this.createNotification.update(id, {
        error_reason: JSON.stringify({
        status: error.statusCode,
        message: error.message,
        timestamp: new Date()
        }),
        status:"failed"
        });
      }
    }
  }

  private defineSender(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]["event"]): ISenderNotification {
    return data == "notification.send_sms" ? this.smsSender : this.gmailSender; 
  } 
}
