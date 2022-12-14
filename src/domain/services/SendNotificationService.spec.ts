import { UUIDGenerator } from '../../../src/domain/contracts/gateways/uuid';
import { UUIDGeneratorMock } from '../../../test/mocks/UUIDGenerator.mock';
import { InMemoryNotificationsRepository } from '../../infra/database/repositories/inMemory/InMemoryNotificationsRepository';
import { Notification } from '../entities/Notification';
import {
  SendNotificationParams,
  SendNotificationService,
} from './SendNotificationService';

describe('SendNotificationService', () => {
  let sut: SendNotificationService;
  let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
  let uuidGenerator: UUIDGenerator;

  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    uuidGenerator = new UUIDGeneratorMock();

    sut = new SendNotificationService(
      inMemoryNotificationsRepository,
      uuidGenerator,
    );
  });

  it('should be able to send a notification', async () => {
    const data: SendNotificationParams = {
      recipientId: 'anyRecipientId',
      content: 'anyContent',
      category: 'anyCategory',
    };

    const response = await sut.execute(data);

    expect(response.notification).toBeInstanceOf(Notification);
  });

  it('should call NotificationsRepository with correct params', async () => {
    const createNotificationInMemorySpy = jest.spyOn(
      inMemoryNotificationsRepository,
      'create',
    );

    const data: SendNotificationParams = {
      recipientId: 'anyRecipientId',
      content: 'anyContent',
      category: 'anyCategory',
    };

    const { notification } = await sut.execute(data);

    expect(createNotificationInMemorySpy).toBeCalledTimes(1);
    expect(createNotificationInMemorySpy).toBeCalledWith(notification);
  });
});
