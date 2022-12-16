import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationObjectType {
  @Field(() => ID)
  id: string;

  @Field()
  recipientId: string;

  @Field()
  content: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  readAt: Date;

  @Field({ nullable: true })
  canceledAt: Date;

  @Field()
  createdAt: Date;
}
