import { ICreateNotification, INotificationHandler } from "@/interface/ICreateNotification.js";
import { SchemaTypeZod } from "@/types/index.js";

export class NotificationHandler implements INotificationHandler {
  constructor(private readonly createNotification: ICreateNotification) {}
  async execute(data: SchemaTypeZod["SchemaOutboxSchedulingSystem"]): Promise<void> {
    console.log(data);
    const resultNotification = await this.createNotification.execute(data);
  }
}