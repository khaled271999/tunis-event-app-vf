import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // adapte si tu l’as ailleurs
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
  async update(id: string, data: UpdateUserDto) {
    const { organization, role, ...userData } = data;

    // 1. Update basic user info
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        role,
      },
    });

    // 2. Si l’utilisateur devient ORGANISATEUR
    if (role === Role.ORGANISATEUR && organization) {
      const existingOrg = await this.prisma.organization.findUnique({
        where: { userId: id },
      });

      if (existingOrg) {
        // Mise à jour si l’organisation existe déjà
        await this.prisma.organization.update({
          where: { userId: id },
          data: {
            name: organization.name,
            description: organization.description,
            subdomain: organization.name.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      } else {
        // Création si elle n’existe pas encore
        await this.prisma.organization.create({
          data: {
            userId: id,
            name: organization.name,
            description: organization.description,
            subdomain: organization.name.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }
    }

    // 3. Si l’utilisateur n’est plus ORGANISATEUR, on supprime l’organisation
    if (role !== Role.ORGANISATEUR) {
      await this.prisma.organization.deleteMany({
        where: { userId: id },
      });
    }

    return updatedUser;
  }

  async remove(id: string) {
    // Supprimer d'abord l'organisation liée (s'il y en a une)
    await this.prisma.organization.deleteMany({
      where: {
        userId: id,
      },
    });

    // Puis supprimer l'utilisateur
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
