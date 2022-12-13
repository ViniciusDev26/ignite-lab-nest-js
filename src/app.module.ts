import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/Prisma.service';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
