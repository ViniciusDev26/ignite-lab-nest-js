import { Content } from '../valueObjects/notifications/content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      id: 'anyId',
      recipientId: 'anyRecipientId',
      content: new Content('any content value'),
      category: 'social',
    });

    expect(notification).toBeInstanceOf(Notification);
  });
});
