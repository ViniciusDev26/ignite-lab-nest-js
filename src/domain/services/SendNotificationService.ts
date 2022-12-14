import { Injectable } from '@nestjs/common';
import { UUIDGenerator } from '../contracts/gateways/uuid';
import { NotificationsRepository } from '../contracts/repositories/NotificationsRepository';
import { Notification } from '../entities/Notification';
import { Content } from '../valueObjects/notifications/content';

export interface SendNotificationParams {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
class SendNotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly uuidGenerator: UUIDGenerator,
  ) {}
  async execute(
    params: SendNotificationParams,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = params;
    const notification = new Notification({
      id: this.uuidGenerator.uuid(),
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}

export { SendNotificationService };
