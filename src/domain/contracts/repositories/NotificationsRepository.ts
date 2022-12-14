import { Notification } from 'src/domain/entities/Notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
