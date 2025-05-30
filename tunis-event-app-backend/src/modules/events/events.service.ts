import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(
    eventData: CreateEventDto,
    userId: string,
    organizationId: string,
  ) {
    const eventPayload = {
      name: eventData.name,
      description: eventData.description,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      venue: eventData.venue,
      tags: eventData.tags,
      type: eventData.type,
      organizerId: userId,
      organizationId,
      key: `${eventData.name}-${Date.now()}`,
      image: {},
      theme: {},
      badges: {},
      link: '',
      isExt: false,
      hiddenVenue: false,
    };

    return this.prisma.event.create({
      data: eventPayload,
    });
  }

  async getAllEvents() {
    return this.prisma.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async deleteEvent(id: string) {
    try {
      return await this.prisma.event.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Événement avec l'ID ${id} non trouvé`);
    }
  }
  async getApprovedEvents() {
    return this.prisma.event.findMany({
      where: {
        deletedAt: null,
        approved: true, // ou status: 'APPROUVÉ' si tu utilises un champ status
      },
      include: {
        organizer: {
          select: { id: true, name: true, email: true, role: true },
        },
        organization: {
          select: { id: true, name: true, description: true },
        },
      },
    });
  }
}
