import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core';

interface CountRecipientNotificationsServiceRequest {
  recipientId: string;
}

interface CountRecipientNotificationsServiceResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationsService
  implements
    Service<
      CountRecipientNotificationsServiceRequest,
      CountRecipientNotificationsServiceResponse
    >
{
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    params: CountRecipientNotificationsServiceRequest,
  ): Promise<CountRecipientNotificationsServiceResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(
      params.recipientId,
    );

    return { count };
  }
}
