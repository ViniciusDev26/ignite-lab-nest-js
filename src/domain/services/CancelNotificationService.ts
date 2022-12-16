import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../contracts/repositories/NotificationsRepository';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { Service } from '@shared/core/Service';

interface SendNotificationParams {
  notificationId: string;
}

@Injectable()
class CancelNotificationService
  implements Service<SendNotificationParams, void>
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(params: SendNotificationParams): Promise<void> {
    const { notificationId } = params;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}

export { CancelNotificationService };
