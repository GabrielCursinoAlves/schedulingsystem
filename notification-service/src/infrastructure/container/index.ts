import { NotificationResultService } from "@/services/NotificationResultService.js";
import { NotificationHandler } from "@/services/NotificationHandlerService.js";
import { RepositoriesSystem } from "@/repositories/index.js";
import { TwilioService } from "@/services/TwilioService.js";
import { GmailService } from "@/services/GmailService.js";

const createNotification = new RepositoriesSystem.CreateNotification();
const createNotificationOutbox = new RepositoriesSystem.CreateNotificationOutbox();

const ControllerNotificationDi = {
  notificationHandler: new NotificationHandler(
    new NotificationResultService( createNotification, createNotificationOutbox ),
    createNotification,
    new GmailService(),
    new TwilioService(),
  ),
};

export const ControllerNotificationSystemDi = {
  createHandler: ControllerNotificationDi.notificationHandler
}
