import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CommentService } from './comment.service';
import { AuthenticatedRequest } from '../../common/interfaces/AuthenticatedRequest';
import { CreateCommentDto } from './dto/create-comment.dto';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un commentaire' })
  @UseGuards(JwtAuthGuard)
  @Post(':eventId')
  async createComment(
    @Req() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(
      req.user.userId,
      eventId,
      createCommentDto.content,
      createCommentDto.rating,
    );
  }

  @ApiOperation({ summary: 'Récupérer tous les commentaires d’un événement' })
  @Get('event/:eventId')
  getAllCommentsForEvent(@Param('eventId') eventId: string) {
    return this.commentService.getAllForEvent(eventId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Signaler un commentaire' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/report')
  reportComment(@Param('id') id: string) {
    return this.commentService.report(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Annuler un signalement (SuperAdmin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Patch(':id/unreport')
  unreportComment(@Param('id') id: string) {
    return this.commentService.unreport(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lister tous les commentaires signalés (SuperAdmin)',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get('reported')
  getReportedComments() {
    return this.commentService.getAllReported();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un commentaire (SuperAdmin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.delete(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer son propre commentaire' })
  @UseGuards(JwtAuthGuard)
  @Delete('own/:id')
  deleteOwnComment(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.commentService.deleteOwnComment(req.user.userId, id);
  }
}
