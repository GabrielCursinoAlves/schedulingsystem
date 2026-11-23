import { ICreateNotification, INotificationHandler, INotificationResult } from "@/interface/ICreateNotification.js";
import { NotificationOutboxEventRecord } from "@/types/prisma/NotificationDispatchType.js";
import { ISenderNotification } from "@/interface/ISenderNotication.js";
import { DispatchOutboxEventype } from "@generated/prisma/client.js";
import { SenderType } from "@/types/zod/SenderType.js";
import { SchemaTypeZod } from "@/types/index.js";

export class NotificationHandler implements INotificationHandler {
  
  constructor(
    private readonly createNotificationResult: INotificationResult,
    private readonly createNotification: ICreateNotification,
    private readonly gmailSender: ISenderNotification,
    private readonly smsSender: ISenderNotification
  ) {}

  async execute(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<void> {
    let errorMessage: SenderType["errorMessage"] | undefined;
    let success: boolean = false;

    const { id, phone, email_alert, message, severity, alreadyFinished } = await this.createNotification.create(data);

    if (alreadyFinished) return;

    const senderService = this.defineSender(data.event);

    try {
      ({ success, errorMessage } = await senderService.send({ message,
        ...( phone && { phone }),
        ...( severity && { severity }),
        ...( email_alert && { email_alert }),
      }));

    }catch (error) {
      return await this.createNotificationResult.execute({
        id,
        status: "failed",
        jobId: data.jobId,
        eventId: data.eventId,
        error_reason: error instanceof Error && error.message ? error.message : "Unexpected error while sending notification",
        event_type: NotificationOutboxEventRecord[`${data.event}_result`] as DispatchOutboxEventype
      });
    }

    const listenAttempts = Boolean(errorMessage?.attempt && errorMessage?.attempt > 0);
   
    if(success) {
      return await this.createNotificationResult.execute({
        id,
        jobId: data.jobId,
        eventId: data.eventId,
        attempt: errorMessage?.attempt ?? 0,
        status: listenAttempts ? "retry_send" : "sent",
        event_type: NotificationOutboxEventRecord[`${data.event}_result`] as DispatchOutboxEventype
      });
    }
   
    return await this.createNotificationResult.execute({
      id,
      status: "failed",
      jobId: data.jobId,
      eventId: data.eventId,
      attempt: listenAttempts ? errorMessage!.attempt : 0,
      error_reason: errorMessage?.message || "Failed to send notification",
      event_type: NotificationOutboxEventRecord[`${data.event}_result`] as DispatchOutboxEventype
    });
  }

  private defineSender(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]["event"]): ISenderNotification {
    return data == "notification.send_sms" ? this.smsSender : this.gmailSender; 
  } 
}
