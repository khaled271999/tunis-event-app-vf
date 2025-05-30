import { Module } from '@nestjs/common';
import { SuperAdminController } from './superadmin.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [SuperAdminController],
  providers: [PrismaService],
})
export class SuperAdminModule {}
