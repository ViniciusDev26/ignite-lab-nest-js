import { Module } from '@nestjs/common';
import { NotificationResolver } from './resolvers/NotificationResolver';
import { GetRecipientNotificationsService } from '@domain/services';
import { DatabaseModule } from '@infra/database/database.module';

import { GraphQLModule as NestGraphqlModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    DatabaseModule,
    NestGraphqlModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [NotificationResolver, GetRecipientNotificationsService],
})
export class GraphQLModule {}
