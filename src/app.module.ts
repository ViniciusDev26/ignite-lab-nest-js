import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { GraphQLModule } from '@infra/graphql/graphql.module';
@Module({
  imports: [DatabaseModule, HttpModule, GraphQLModule],
})
export class AppModule {}
