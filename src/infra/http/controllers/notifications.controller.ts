import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationService } from '@domain/services/SendNotificationService';

import { CreateNotificationDTO } from '../dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotificationService) {}
  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return notification;
  }
}
