import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationService } from '@domain/services/SendNotificationService';

import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';
import {
  CancelNotificationService,
  ReadNotificationService,
  UnreadNotificationService,
  CountRecipientNotificationsService,
  GetRecipientNotificationsService,
} from '@domain/services';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotificationService,
    private readonly cancelNotification: CancelNotificationService,
    private readonly readNotification: ReadNotificationService,
    private readonly unreadNotification: UnreadNotificationService,
    private readonly countRecipientNotifications: CountRecipientNotificationsService,
    private readonly getRecipientNotifications: GetRecipientNotificationsService,
  ) {}

  @Get('/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Get('/:recipientId/count')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModel.toHTTP(notification);
  }
}
