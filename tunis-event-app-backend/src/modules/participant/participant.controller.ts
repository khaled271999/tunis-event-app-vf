import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { AuthenticatedRequest } from '../../common/interfaces/AuthenticatedRequest'; // ✅ ton interface personnalisée

@Controller('participant')
export class ParticipantController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createParticipation(
    @Req() req: AuthenticatedRequest,
    @Body() body: { eventId: string },
  ) {
    const userId = req.user.userId;

    if (!body.eventId) {
      throw new BadRequestException('eventId manquant');
    }

    const participation = await this.prisma.participation.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: body.eventId } },
      },
    });

    return {
      message: 'Participation enregistrée',
      participationId: participation.id,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PARTICIPANT)
  @Get('mes-evenements')
  async getMyEvents(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;

    const participations = await this.prisma.participation.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            organization: true,
            organizer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // On ne retourne que les événements extraits des participations
    return participations.map((p) => p.event);
  }
}
