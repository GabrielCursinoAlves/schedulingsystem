import { NotificationHandler } from "@/services/NotificationHandlerService.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { TwilioService } from "@/services/TwilioService.js";
import { GmailService } from "@/services/GmailService.js";

const ControllerNotificationDi = {
  notificationHandler: new NotificationHandler(
    new RepositoriesSystem.CreateNotification(),
    new GmailService(),
    new TwilioService(),
  ),
};

export const ControllerNotificationSystemDi = {
  createHandler: ControllerNotificationDi.notificationHandler
}
