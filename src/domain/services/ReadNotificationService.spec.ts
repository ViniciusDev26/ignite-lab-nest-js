import { NotificationsRepository } from '@domain/contracts/repositories/NotificationsRepository';
import { NotificationNotFound } from '@domain/errors/NotificationNotFound';
import { InMemoryNotificationsRepository } from '@infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { makeNotification } from '@test/factories/NotificationFactory';
import { ReadNotificationService } from './ReadNotificationService';

describe('ReadNotificationService', () => {
  let sut: ReadNotificationService;
  let notificationsRepository: NotificationsRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationService(notificationsRepository);
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

  it('should read notification correctly', async () => {
    const notification = makeNotification();
    await notificationsRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    const updatedNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(updatedNotification.readAt).toEqual(expect.any(Date));
  });
});
