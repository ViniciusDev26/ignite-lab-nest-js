import { Module } from '@nestjs/common';
import {
  CancelNotificationService,
  CountRecipientNotificationsService,
  GetRecipientNotificationsService,
  ReadNotificationService,
  SendNotificationService,
  UnreadNotificationService,
} from 'src/domain/services';
import { CryptographModule } from '../cryptograph/cryptograph.module';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule, CryptographModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationService,
    ReadNotificationService,
    UnreadNotificationService,
    GetRecipientNotificationsService,
    CountRecipientNotificationsService,
    CancelNotificationService,
  ],
})
export class HttpModule {}
