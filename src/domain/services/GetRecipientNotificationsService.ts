import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { Notification } from '@domain/entities/Notification';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core';

interface GetRecipientNotificationsServiceRequest {
  recipientId: string;
}

interface GetRecipientNotificationsServiceResponse {
  notifications: Notification[] | null;
}

@Injectable()
export class GetRecipientNotificationsService
  implements
    Service<
      GetRecipientNotificationsServiceRequest,
      GetRecipientNotificationsServiceResponse
    >
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    params: GetRecipientNotificationsServiceRequest,
  ): Promise<GetRecipientNotificationsServiceResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(
        params.recipientId,
      );

    return { notifications };
  }
}
