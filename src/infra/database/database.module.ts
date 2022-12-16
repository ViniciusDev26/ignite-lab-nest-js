import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { PrismaService } from './connections/Prisma.service';
import { PrismaNotificationsRepository } from './repositories/prisma/PrismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
