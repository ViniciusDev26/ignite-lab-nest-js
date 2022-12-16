import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { InMemoryNotificationsRepository } from '@infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { CountRecipientNotificationsService } from './CountRecipientNotificationsService';
import { makeNotification } from '@test/factories/NotificationFactory';

describe('CountRecipientNotificationsService', () => {
  let sut: CountRecipientNotificationsService;
  let notificationsRepository: NotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountRecipientNotificationsService(notificationsRepository);
  });

  it('should return counter with zero notifications if invalid recipientId is sent', async () => {
    const notification = makeNotification({
      recipientId: 'validId',
    });

    notificationsRepository.create(notification);
    const response = await sut.execute({ recipientId: 'invalidId' });

    expect(response).toEqual({ count: 0 });
  });

  it('should return correct values', async () => {
    const notification = makeNotification({
      recipientId: 'validId',
    });

    const notification2 = makeNotification({
      recipientId: 'validId',
    });

    const notification3 = makeNotification({
      recipientId: 'otherId',
    });

    notificationsRepository.create(notification);
    notificationsRepository.create(notification2);
    notificationsRepository.create(notification3);
    const response = await sut.execute({ recipientId: 'validId' });

    expect(response).toEqual({ count: 2 });
  });
});
