import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from '@prisma/client'; // ou ton interface DTO si tu ne veux pas exposer tous les champs

@ApiTags('Public Events') // Pour l'affichage dans Swagger
@Controller('public')
export class PublicEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('events')
  @ApiOperation({ summary: 'Récupérer les événements approuvés (public)' })
  @ApiResponse({
    status: 200,
    description: 'Liste des événements approuvés retournée avec succès.',
  })
  async getApprovedEvents(): Promise<Event[]> {
    return this.eventsService.getApprovedEvents();
  }
}
