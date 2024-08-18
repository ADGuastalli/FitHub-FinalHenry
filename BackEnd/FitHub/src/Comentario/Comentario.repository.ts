import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentarios } from './Comentarios.entity';
import { CommentDto } from './Comentario.dto';
import { IsNull, Not, Repository } from 'typeorm';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { EstadoComentario } from './EstadoComentario.Enum';
import {
  ComentarioActualizacionFallidaException,
  ComentarioCreacionFallidaException,
  ComentarioInactivoException,
  ComentarioNoEncontradoException,
} from 'src/Exceptions/Comentario.exceptions';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comentarios)
    private readonly commentsRepository: Repository<Comentarios>,
  ) {}

  async getCommentsRutina(page: number, limit: number) {
    return this.commentsRepository.find({
      where: {
        isActive: true,
        routine: { id: Not(IsNull()) },
        plan: IsNull(),
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['routine'],
    });
  }

  async getCommentsRevision() {
    return this.commentsRepository.find({
      where: { state: EstadoComentario.OBSERVADO },
    });
  }

  async getCommentsPlan(page: number, limit: number) {
    return this.commentsRepository.find({
      where: { isActive: true, plan: { id: Not(IsNull()) }, routine: IsNull() },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['plan'],
    });
  }

  async getCommentById(id: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id, isActive: true },
    });
    if (!comment) {
      throw new ComentarioNoEncontradoException();
    }
    return comment;
  }

  async createCommentsRutina(comment: CommentDto) {
    try {
      const comentarioRegistrado = await this.commentsRepository.save(comment);
      return comentarioRegistrado;
    } catch (error) {
      throw new ComentarioCreacionFallidaException();
    }
  }
  async createCommentsPlan(comment: CommentDto) {
    try {
      const comentarioRegistrado = await this.commentsRepository.save(comment);
      return comentarioRegistrado;
    } catch (error) {
      throw new ComentarioCreacionFallidaException();
    }
  }

  async updateComment(comment: CommentDto, id: string) {
    const existingComment = await this.commentsRepository.findOneBy({
      id,
      isActive: true,
    });
    if (!existingComment) {
      throw new ComentarioNoEncontradoException();
    }

    const updateData = {
      description: comment.description,
      score: comment.score,
      routine: comment.routine,
      plan: comment.plan,
    };

    try {
      await this.commentsRepository.update(id, updateData);
      const commentUpdate = await this.commentsRepository.findOneBy({ id });
      return commentUpdate;
    } catch (error) {
      throw new ComentarioActualizacionFallidaException();
    }
  }

  async deleteComment(id: string) {
    const deletedComment = await this.commentsRepository.findOneBy({ id });
    if (!deletedComment || deletedComment.isActive === false) {
      if (!deletedComment) {
        throw new ComentarioNoEncontradoException();
      }
      throw new ComentarioInactivoException();
    }
    await this.commentsRepository.update(id, {
      ...deletedComment,
      isActive: false,
    });
    return id;
  }
}
