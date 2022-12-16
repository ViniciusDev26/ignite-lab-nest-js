import { Notification } from 'src/domain/entities/Notification';

export abstract class NotificationsRepository {
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;

  abstract countManyByRecipientId(recipientId: string): Promise<number>;

  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}
