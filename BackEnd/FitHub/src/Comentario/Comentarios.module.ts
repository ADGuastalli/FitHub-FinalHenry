import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentarios } from './Comentarios.entity';
import { CommentsController } from './Comentarios.controller';
import { CommentsRepository } from './Comentario.repository';
import { CommentsService } from './Comentarios.service';
import { ReciboModule } from 'src/Recibo/recibo.module';
import { RutinaModule } from 'src/Rutina/Rutina.module';
import { UserService } from 'src/User/User.service';
import { usersModule } from 'src/User/User.module';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentarios, Recibo, Rutina]),
    ReciboModule,
    RutinaModule,
    usersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsRepository, CommentsService],
})
export class commentsModule {}
