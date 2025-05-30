import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaService } from '../../prisma.service';
import { PassportModule } from '@nestjs/passport';
import { PublicEventsController } from './public-events.controller';

@Module({
  imports: [PassportModule],
  controllers: [EventsController, PublicEventsController],
  providers: [EventsService, PrismaService],
})
export class EventsModule {}
