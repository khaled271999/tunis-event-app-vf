import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { AuthenticatedRequest } from '../../common/interfaces/AuthenticatedRequest';

@Controller('organisateur')
export class OrganizationController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANISATEUR)
  @Get('mes-evenements')
  async getMyEvents(@Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;

    const events = await this.prisma.event.findMany({
      where: {
        organizerId: userId,
        deletedAt: null,
      },
      include: {
        organization: true,
        participations: true,
        comments: true,
      },
    });

    return events;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-organization') // <- pour plus de clarté
  async createOrganization(
    @Request() req: AuthenticatedRequest,
    @Body() body: { name: string; description?: string },
  ) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        throw new HttpException(
          'Utilisateur non authentifié',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const org = await this.prisma.organization.create({
        data: {
          name: body.name,
          description: body.description ?? '',
          subdomain: body.name.toLowerCase().replace(/\s+/g, '-'),
          published: false,
          approved: false,
          user: {
            connect: { id: userId },
          },
        },
      });

      return {
        message: 'Organisation créée avec succès',
        organization: {
          id: org.id,
          name: org.name,
        },
      };
    } catch (error) {
      console.error('Erreur création organisation :', error);
      throw new HttpException(
        'Erreur serveur lors de la création de l’organisation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
