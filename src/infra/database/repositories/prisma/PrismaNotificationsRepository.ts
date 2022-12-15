import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { Notification } from '@domain/entities/Notification';
import { PrismaService } from '../../Prisma.service';
import { PrismaNotificationMapper } from '@infra/database/mappers/prisma/PrismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }
}
