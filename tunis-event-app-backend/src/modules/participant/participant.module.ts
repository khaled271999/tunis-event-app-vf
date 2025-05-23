import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ParticipantController],
  providers: [PrismaService],
})
export class ParticipantModule {}
