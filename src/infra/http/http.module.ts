import { Module } from '@nestjs/common';
import { SendNotificationService } from 'src/domain/services/SendNotificationService';
import { CryptographModule } from '../cryptograph/cryptograph.module';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule, CryptographModule],
  controllers: [NotificationsController],
  providers: [SendNotificationService],
})
export class HttpModule {}
