import { notification_routes } from "../config/constants";
import config from "../config/config";
import mqConnection from "../config/rabbitmq.config";
import { generateUuid } from "./utils";

export type INotification = {
    action: string;
    data?: any;
};

export class Notification {
    private static promiseMap: Map<string, (value: any) => void> = new Map();

    static async send(router: string, notification: INotification) {
        const correlationId = generateUuid();
        if (router === notification_routes.admin) {
            await mqConnection.sendToQueue(config.NOTIFICATION_QUEUE.request, notification, correlationId);
        } else if (router === notification_routes.task) {
            await mqConnection.sendToQueue(config.NOTIFICATION_QUEUE.task, notification, correlationId);
        } else {
            return;
        }

        return new Promise((resolve, _reject) => Notification.promiseMap.set(correlationId, resolve));
    }

    static async get(msg: any, correlationId: string) {
        const { message } = JSON.parse(msg);
        if (Notification.promiseMap.has(correlationId)) {
            const resolve = Notification.promiseMap.get(correlationId);

            if (resolve) {
                resolve(message.data.data);
            }

            Notification.promiseMap.delete(correlationId);
        }
    }
}