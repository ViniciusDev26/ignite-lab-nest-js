import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/domain/contracts/repositories/NotificationsRepository';
import { PrismaService } from './Prisma.service';
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
