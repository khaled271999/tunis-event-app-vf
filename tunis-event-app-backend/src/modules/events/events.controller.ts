import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BadRequestException } from '@nestjs/common';

import { AuthenticatedRequestUser } from '../../types/user-request.interface';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBody } from '@nestjs/swagger';
@Controller('events')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANISATEUR)
  createEvent(@Body() dto: CreateEventDto, @Req() req: Request) {
    const user = req.user as AuthenticatedRequestUser;

    if (!user.userId) {
      throw new BadRequestException(
        'Organization ID is required for creating events',
      );
    }

    return this.eventsService.createEvent(
      dto,
      user.userId,
      user.organizationId,
    );
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
  @Patch(':id/approve')
  @Roles(Role.SUPERADMIN)
  async approveEvent(@Param('id') id: string) {
    return this.eventsService.updateEventStatus(id, 'approved');
  }

  @Patch(':id/reject')
  @Roles(Role.SUPERADMIN)
  async rejectEvent(@Param('id') id: string) {
    return this.eventsService.updateEventStatus(id, 'rejected');
  }
  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANISATEUR)
  getMyEvents(@Req() req: Request) {
    const user = req.user as AuthenticatedRequestUser;
    return this.eventsService.getEventsByOrganizer(user.userId);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANISATEUR)
  @ApiBody({ type: UpdateEventDto })
  updateEvent(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateEventDto>, // ou un `UpdateEventDto` si tu préfères
    @Req() req: Request,
  ) {
    const user = req.user as AuthenticatedRequestUser;
    return this.eventsService.updateEventByOrganizer(id, user.userId, dto);
  }
  @Delete(':id/organisateur')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANISATEUR)
  deleteMyEvent(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as AuthenticatedRequestUser;
    return this.eventsService.deleteEventByOrganizer(id, user.userId);
  }
  @Get('approved')
  async getApprovedLocalEvents() {
    return this.eventsService.getApprovedLocalEvents();
  }
}
