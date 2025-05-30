import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: Role;
    organizationId?: string;
  };
}

@Controller('events')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(Role.ORGANISATEUR, Role.SUPERADMIN)
  async createEvent(
    @Body() eventData: CreateEventDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const { userId, organizationId } = req.user;
    if (!organizationId && req.user.role !== Role.SUPERADMIN) {
      throw new Error('Organization ID is required for creating events');
    }
    return this.eventsService.createEvent(eventData, userId, organizationId!);
  }

  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  async deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
