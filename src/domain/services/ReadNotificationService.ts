import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core';

interface ReadNotificationServiceRequest {
  notificationId: string;
}

@Injectable()
class ReadNotificationService
  implements Service<ReadNotificationServiceRequest, void>
{
  constructor(
    private readonly notificationRepository: NotificationsRepository,
  ) {}
  async execute(params: ReadNotificationServiceRequest): Promise<void> {
    const { notificationId } = params;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    this.notificationRepository.save(notification);
  }
}

export { ReadNotificationService };
