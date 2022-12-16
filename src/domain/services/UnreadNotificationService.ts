import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core';

interface UnreadNotificationServiceRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotificationService
  implements Service<UnreadNotificationServiceRequest, void>
{
  constructor(
    private readonly notificationRepository: NotificationsRepository,
  ) {}
  async execute(params: UnreadNotificationServiceRequest): Promise<void> {
    const { notificationId } = params;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    this.notificationRepository.save(notification);
  }
}
