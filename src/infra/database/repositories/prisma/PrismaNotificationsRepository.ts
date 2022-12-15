import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { Notification } from '@domain/entities/Notification';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
