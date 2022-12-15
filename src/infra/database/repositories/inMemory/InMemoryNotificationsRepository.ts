import { Notification } from '@domain/entities/Notification';
import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
