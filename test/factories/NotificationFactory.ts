import { Notification, NotificationProps } from '@domain/entities/Notification';
import { Content } from '@domain/valueObjects/notifications/content';

export function makeNotification(
  override: Partial<NotificationProps> = {},
): Notification {
  const content = new Content('any content');
  const notification = new Notification({
    id: 'anyId',
    category: 'any category',
    content,
    recipientId: 'anyId',
    ...override,
  });

  return notification;
}
