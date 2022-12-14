import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: string;
}
