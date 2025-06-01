import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        role,
      },
    });

    if (role === Role.ORGANISATEUR && organization) {
      const existingOrg = await this.prisma.organization.findUnique({
        where: { userId: id },
      });

      const orgData = {
        name: organization.name,
        description: organization.description,
        subdomain: organization.name.toLowerCase().replace(/\s+/g, '-'),
      };

      if (existingOrg) {
        await this.prisma.organization.update({
          where: { userId: id },
          data: orgData,
        });
      } else {
        await this.prisma.organization.create({
          data: { userId: id, ...orgData },
        });
      }
    }

    if (role !== Role.ORGANISATEUR) {
      await this.prisma.organization.deleteMany({
        where: { userId: id },
      });
    }

    return updatedUser;
  }

  async remove(id: string) {
    await this.prisma.organization.deleteMany({ where: { userId: id } });
    return this.prisma.user.delete({ where: { id } });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('Utilisateur introuvable');
    }

    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (dto.name && dto.name !== user.name) {
      updateData.name = dto.name;
    }

    if (dto.email && dto.email !== user.email) {
      updateData.email = dto.email;
    }

    if (dto.newPassword) {
      if (!dto.oldPassword) {
        throw new BadRequestException(
          'Ancien mot de passe requis pour changer le mot de passe.',
        );
      }

      const isValid = await bcrypt.compare(dto.oldPassword, user.password);
      if (!isValid) {
        throw new BadRequestException('Ancien mot de passe incorrect');
      }

      const hashed = await bcrypt.hash(dto.newPassword, 10);
      updateData.password = hashed;
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    };
  }
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Utilisateur introuvable');
    }

    return user;
  }
}
