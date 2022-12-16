import { InMemoryNotificationsRepository } from '@infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { CancelNotificationService } from './CancelNotificationService';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { makeNotification } from '@test/factories/NotificationFactory';

describe('CancelNotificationService', () => {
  let sut: CancelNotificationService;
  let notificationRepository: InMemoryNotificationsRepository;

  beforeEach(() => {
    notificationRepository = new InMemoryNotificationsRepository();
    sut = new CancelNotificationService(notificationRepository);
  });

  it('should throw notFoundError if invalidId is sent', async () => {
    const promise = sut.execute({
      notificationId: 'invalidId',
    });

    await expect(promise).rejects.toThrow(NotificationNotFound);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();
    await notificationRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    const notificationUpdated = await notificationRepository.findById(
      notification.id,
    );

    expect(notificationUpdated.canceledAt).toEqual(expect.any(Date));
  });
});
