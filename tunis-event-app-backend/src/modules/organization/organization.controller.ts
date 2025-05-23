import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../../prisma.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtPayloadRequest } from '../auth/types/jwt-payload-request';

@ApiTags('organization')
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: JwtPayloadRequest,
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

      // ✅ Retour clair
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
