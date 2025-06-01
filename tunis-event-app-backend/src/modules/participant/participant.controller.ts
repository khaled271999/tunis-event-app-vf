import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { AuthenticatedRequest } from '../../common/interfaces/AuthenticatedRequest';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('inscription')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        eventId: {
          type: 'string',
        },
      },
      required: ['eventId'],
    },
  })
  async createParticipation(
    @Req() req: AuthenticatedRequest,
    @Body() body: { eventId: string },
  ) {
    const userId = req.user.userId;
    const { eventId } = body;

    if (!eventId) {
      throw new BadRequestException('eventId manquant');
    }

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Événement introuvable dans la base locale');
    }

    if (event.isExt) {
      throw new ForbiddenException(
        "Impossible de s'inscrire à un événement public externe",
      );
    }

    const existing = await this.prisma.participation.findFirst({
      where: { userId, eventId },
    });

    if (existing) {
      throw new BadRequestException('Déjà inscrit à cet événement');
    }

    const participation = await this.prisma.participation.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } },
      },
    });

    return {
      message: 'Inscription réussie',
      participationId: participation.id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('desinscription/:eventId')
  async cancelParticipation(
    @Req() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
  ) {
    const userId = req.user.userId;

    const participation = await this.prisma.participation.findFirst({
      where: { userId, eventId },
    });

    if (!participation) {
      throw new NotFoundException('Participation non trouvée');
    }

    await this.prisma.participation.delete({
      where: { id: participation.id },
    });

    return { message: 'Désinscription réussie' };
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

    return participations.map((p) => p.event);
  }
}
