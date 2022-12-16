import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '@domain/entities/Notification';
import { Content } from '@domain/valueObjects/notifications/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: PrismaNotification) {
    return new Notification({
      id: raw.id,
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      canceledAt: raw.canceledAt,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    });
  }
}
