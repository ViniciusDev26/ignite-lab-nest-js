import { GetRecipientNotificationsService } from '@domain/services';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { NotificationObjectType } from '../models/NotificationObjectType';
import { NotificationViewModel } from '@infra/http/viewModels/NotificationViewModel';

@Resolver()
class NotificationResolver {
  constructor(
    private readonly getRecipientNotifications: GetRecipientNotificationsService,
  ) {}

  @Query(() => [NotificationObjectType])
  async getFromRecipient(@Args('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return notifications.map(NotificationViewModel.toHTTP);
  }
}

export { NotificationResolver };
