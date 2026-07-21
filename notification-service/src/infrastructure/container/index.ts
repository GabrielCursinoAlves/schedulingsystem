import { NotificationHandler } from "@/services/NotificationHandlerService.js";
import { RepositoriesSystem } from "@/repositories/index.js";

const ControllerNotificationDi = {
  notificationHandler: new NotificationHandler(
    new RepositoriesSystem.CreateNotification()
  ),
};

export const ControllerNotificationSystemDi = {
  createHandler: ControllerNotificationDi.notificationHandler
}
