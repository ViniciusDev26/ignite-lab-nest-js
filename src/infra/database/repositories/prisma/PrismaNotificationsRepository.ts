import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { Notification } from '@domain/entities/Notification';
import { PrismaService } from '../../connections/Prisma.service';
import { PrismaNotificationMapper } from '@infra/database/mappers/prisma/PrismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const rawNotifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return rawNotifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notificationPrisma = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notificationPrisma) return null;

    return PrismaNotificationMapper.toDomain(notificationPrisma);
  }

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }
}
