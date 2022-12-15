import { Notification } from '@domain/entities/Notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }
}
