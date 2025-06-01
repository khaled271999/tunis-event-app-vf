import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    eventId: string,
    content: string,
    rating: number,
  ) {
    return this.prisma.comment.create({
      data: {
        userId,
        eventId,
        content: content || '',
        rating: rating ?? 0,
      },
    });
  }

  async getAllForEvent(eventId: string) {
    return this.prisma.comment.findMany({
      where: { eventId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async report(commentId: string) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: { reported: true },
    });
  }

  async unreport(commentId: string) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: { reported: false },
    });
  }

  async delete(commentId: string) {
    return this.prisma.comment.delete({ where: { id: commentId } });
  }

  async getAllReported() {
    return this.prisma.comment.findMany({
      where: { reported: true },
      include: { user: true, event: true },
    });
  }
  async deleteOwnComment(userId: string, commentId: string) {
    // Vérifie si le commentaire appartient bien à l'utilisateur
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) {
      throw new Error('Accès refusé. Ce commentaire ne vous appartient pas.');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
