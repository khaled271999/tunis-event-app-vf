import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN)
export class SuperAdminController {
  constructor(private prisma: PrismaService) {}

  // ✅ Voir tous les utilisateurs
  @Get('users')
  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // ✅ Approuver une organisation
  @Patch('organizations/:id/approve')
  async approveOrganization(@Param('id') id: string) {
    const org = await this.prisma.organization.update({
      where: { id },
      data: { approved: true },
    });
    return {
      message: 'Organisation approuvée',
      organization: org,
    };
  }

  // ✅ Soft delete d’un événement
  @Delete('events/:id')
  async deleteEvent(@Param('id') id: string) {
    try {
      const event = await this.prisma.event.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      return {
        message: 'Événement supprimé (soft delete)',
        event,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Événement non trouvé', HttpStatus.NOT_FOUND);
    }
  }
}
