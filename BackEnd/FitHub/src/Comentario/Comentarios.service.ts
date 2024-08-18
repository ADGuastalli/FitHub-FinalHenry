/* eslint-disable prettier/prettier */
import { ReciboService } from 'src/Recibo/recibo.service';
import { CommentDto } from './Comentario.dto';
import { CommentsRepository } from './Comentario.repository';
import { RutinaService } from 'src/Rutina/Rutinas.Service';
import { UserService } from 'src/User/User.service';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Repository } from 'typeorm';
import { Rutina } from 'src/Rutina/Rutina.entity';

export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly reciboService: ReciboService,
    private readonly rutinaService: RutinaService,
    private readonly usersService: UserService,
    @InjectRepository(Recibo)
    private readonly reciboRepository : Repository<Recibo>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}

  async getCommentsRutina(page: string, limit: string) {
    return await this.commentsRepository.getCommentsRutina(Number(page), Number(limit));
  }
  async getCommentsRevision() {
    return await this.commentsRepository.getCommentsRevision();
  }

  async getCommentsRutinaById(rutinaId: string) {
    const rutinaComentada = await this.rutinaRepository.findOne({
        where: { id: rutinaId },
        relations: ['comments'],
    });
    if (!rutinaComentada || rutinaComentada.comments.length === 0) {
      return 'No hay comentarios para esta rutina';
  }
    console.log(rutinaComentada);

    const totalPuntuacion = rutinaComentada.comments.reduce((total, comment) => {
        return total + comment.score;
    }, 0);

    const promedio = totalPuntuacion / rutinaComentada.comments.length;
    const totalDeComentarios = rutinaComentada.comments.length;

    return {rutinaComentada, promedio, totalDeComentarios};
}

  async getCommentsPlan(page: string, limit: string) {
    return await this.commentsRepository.getCommentsPlan(Number(page), Number(limit));
  }

  async getCommentsById(id: string) {
    return await this.commentsRepository.getCommentById(id);
  }

  //Revisar porque si tipeo como CommentDTO me da error
  async createCommentsRutina(comment, userId: string) {
    const { routine } = comment;
    // const rutinaId = routine.id;
    const user = await this.usersService.getUserByIdPyR(userId, userId);
    const rutinasCompradas = user.routine;
    const rutinaAComentar = rutinasCompradas.find((rutina) => rutina.id === routine);
    console.log(rutinaAComentar);
    if (!rutinaAComentar) {
      throw new BadRequestException('Usted no ha comprado esta rutina');
    }
    const reciboDeCompra = await this.reciboRepository.findOne({
      where: { rutinas: { id: routine } },
      relations: ['rutina'], 
    });
    
    if (!reciboDeCompra) {
      throw new BadRequestException('No se encontró el recibo de compra para esta rutina');
    }

    const fechaCompra = reciboDeCompra.date;
    const fechaActual = new Date();

    const diferenciaDias = Math.floor((fechaActual.getTime() - fechaCompra.getTime()) / (1000 * 60 * 60 * 24));

    if (diferenciaDias > 10) {
      throw new BadRequestException('No puede comentar sobre esta rutina porque han pasado más de 10 días desde su compra');
    }

    await this.commentsRepository.createCommentsRutina(comment);
    return comment;
  }

  async createCommentsPlan(comment: CommentDto) {
    await this.commentsRepository.createCommentsPlan(comment);
    return comment;
  }

  async updateComment(id, comment) {
    await this.commentsRepository.updateComment(id, comment);
  }

  async deleteComment(id: string) {
    return this.commentsRepository.deleteComment(id);
  }
}
