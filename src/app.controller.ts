import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './database/Prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationDTO } from './dtos/create-notification.dto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return await this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationDTO) {
    const { content, category, recipientId } = body;
    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
