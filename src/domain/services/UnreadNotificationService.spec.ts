import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { InMemoryNotificationsRepository } from '@infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/NotificationFactory';
import { UnreadNotificationService } from './UnreadNotificationService';

describe('UnreadNotificationService', () => {
  let sut: UnreadNotificationService;
  let notificationsRepository: NotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotificationService(notificationsRepository);
  });

  it('should throw NotificationNotFound if invalid id is sent', async () => {
    const promise = () =>
      sut.execute({
        notificationId: 'invalidId',
      });

    await expect(promise).rejects.toThrowError(NotificationNotFound);
  });

  it('should call notificationsRepository.save() with correct params', async () => {
    const notificationsRepositorySaveSpy = jest.spyOn(
      notificationsRepository,
      'save',
    );
    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepositorySaveSpy).toBeCalledTimes(1);
    expect(notificationsRepositorySaveSpy).toBeCalledWith(notification);
  });

  it('should unread notification correctly', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    const updatedNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(updatedNotification.readAt).toEqual(null);
  });
});
