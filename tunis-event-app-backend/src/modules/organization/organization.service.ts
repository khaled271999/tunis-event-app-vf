import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(data: {
    name: string;
    description?: string;
    userId: string;
  }) {
    return this.prisma.organization.create({
      data: {
        name: data.name,
        description: data.description,
        user: {
          connect: { id: data.userId },
        },
        subdomain: data.name.toLowerCase().replace(/\s+/g, '-'),
        published: false,
        approved: false,
      },
    });
  }
}
