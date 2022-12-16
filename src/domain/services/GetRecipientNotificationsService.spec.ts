import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { InMemoryNotificationsRepository } from '@infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/NotificationFactory';
import { GetRecipientNotificationsService } from './GetRecipientNotificationsService';

describe('GetRecipientNotificationsService', () => {
  let sut: GetRecipientNotificationsService;
  let notificationsRepository: NotificationsRepository;
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new GetRecipientNotificationsService(notificationsRepository);
  });

  it('should return null if any notification is found', async () => {
    const notification = makeNotification();
    notificationsRepository.create(notification);

    const response = await sut.execute({
      recipientId: 'invalidId',
    });

    expect(response.notifications.length).toBe(0);
  });

  it('should return recipient notifications', async () => {
    const notification = makeNotification({ recipientId: 'validId' });
    const notification2 = makeNotification({ recipientId: 'validId' });
    const notification3 = makeNotification();

    notificationsRepository.create(notification);
    notificationsRepository.create(notification2);
    notificationsRepository.create(notification3);

    const { notifications } = await sut.execute({
      recipientId: 'validId',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([notification, notification2]),
    );
  });
});
export { GetRecipientNotificationsService };
