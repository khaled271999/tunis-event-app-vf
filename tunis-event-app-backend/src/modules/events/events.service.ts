import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
      status: 'pending',
      tags: eventData.tags,
      type: eventData.type,
      key: `${eventData.name}-${Date.now()}`,
      image: {},
      theme: {},
      badges: {},
      link: '',
      isExt: false,
      hiddenVenue: false,

      organizer: {
        // ✅ Remplace organizerId
        connect: { id: userId },
      },
      organization: {
        // ✅ Remplace organizationId
        connect: { id: organizationId },
      },
    };
    console.log('➡️ Event creation payload:', {
      organizerId: userId,
      organizationId,
    });
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
  async updateEventStatus(id: string, status: 'approved' | 'rejected') {
    return this.prisma.event.update({
      where: { id },
      data: {
        status,
        approved: status === 'approved',
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
  async getEventsByOrganizer(userId: string) {
    return this.prisma.event.findMany({
      where: {
        deletedAt: null,
        organizerId: userId,
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }
  async updateEventByOrganizer(
    id: string,
    userId: string,
    data: Partial<UpdateEventDto>,
  ) {
    const existing = await this.prisma.event.findFirst({
      where: {
        id,
        organizerId: userId,
        deletedAt: null,
      },
    });

    if (!existing) {
      throw new NotFoundException('Événement introuvable ou non autorisé');
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        status: 'pending', // ✅ repasse en attente après modification
        approved: false,
      },
    });
  }
  async deleteEventByOrganizer(id: string, userId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id,
        organizerId: userId,
        deletedAt: null,
      },
    });

    if (!event) {
      throw new NotFoundException('Événement introuvable ou non autorisé');
    }

    return this.prisma.event.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
  async getApprovedLocalEvents() {
    return this.prisma.event.findMany({
      where: {
        approved: true,
        deletedAt: null,
      },
      include: {
        organizer: true,
        organization: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
  }
}
