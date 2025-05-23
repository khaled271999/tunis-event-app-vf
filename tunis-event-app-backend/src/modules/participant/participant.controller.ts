import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../../prisma.service';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedUser {
  userId: string;
  email: string;
  role: 'SUPERADMIN' | 'ORGANISATEUR' | 'PARTICIPANT';
}

@Controller('participant')
export class ParticipantController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: ExpressRequest,
    @Body() body: { eventId: string },
  ) {
    const user = req.user as AuthenticatedUser;

    if (!body.eventId) {
      throw new BadRequestException('eventId manquant');
    }

    const participation = await this.prisma.participation.create({
      data: {
        user: { connect: { id: user.userId } }, // ✅ ici on utilise bien le champ typé
        event: { connect: { id: body.eventId } },
      },
    });

    return {
      message: 'Participation enregistrée',
      participationId: participation.id,
    };
  }
}
