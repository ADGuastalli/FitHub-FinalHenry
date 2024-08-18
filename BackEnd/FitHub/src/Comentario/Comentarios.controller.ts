import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './Comentarios.service';
import { Comentarios } from './Comentarios.entity';
import { UUID } from 'crypto';
import { CommentDto } from './Comentario.dto';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import { Roles, UserRole } from 'src/User/User.enum';

@ApiTags('Comentarios')
@Controller('comentarios')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('rutinas')
  async getCommentsRutina(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<Comentarios[]> {
    return await this.commentsService.getCommentsRutina(page, limit);
  }
  @Get('planes')
  async getCommentsPlan(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<Comentarios[]> {
    return await this.commentsService.getCommentsPlan(page, limit);
  }

  @Get('rutina/:id')
  async getCommentsRutinaById(@Param() id: string, @Req() req) {
    const rutinaId = id;
    return await this.commentsService.getCommentsRutinaById(rutinaId);
  }

  @Get('revision')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard /*RolesGuard*/)
  async getCommentsRevision() {
    return await this.commentsService.getCommentsRevision();
  }

  @Get(':id')
  async getCommentsById(@Param('id') id: UUID) {
    return await this.commentsService.getCommentsById(id);
  }

  @Post('rutina')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard)
  async createCommentsRutina(@Body() comment: CommentDto, @Req() req) {
    const userId = req.user.sub;
    return await this.commentsService.createCommentsRutina(comment, userId);
  }
  @Post('plan')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard)
  async createCommentsPlan(@Body() comment: CommentDto) {
    return await this.commentsService.createCommentsPlan(comment);
  }

  @Put(':id')
  @Roles(UserRole.USER)
  @UseGuards(AuthGuard)
  async updateComment(@Body() comment: CommentDto, @Param('id') id: UUID) {
    return await this.commentsService.updateComment(comment, id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard /*RolesGuard*/)
  async deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
