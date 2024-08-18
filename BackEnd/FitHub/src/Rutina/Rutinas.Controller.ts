/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Delete,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Get } from '@nestjs/common';
import { RutinaService } from './Rutinas.Service';
import { CreateRutinaDto } from './Rutinas.Dto';
import { UpdateRutinaDto } from './Rutinas.Dto';
import { Rutina } from './Rutina.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { throwError } from 'rxjs';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';
import { auth } from 'express-openid-connect';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import MercadoPagoConfig from 'mercadopago';
import { Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles, UserRole } from 'src/User/User.enum';
import { RolesGuard } from 'src/Guard/roles.guard';
@ApiTags('Rutina')
@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Get()
  async getRutinas(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('difficultyLevel') difficultyLevel?: DifficultyLevel,
    @Query('search') search?: string,
  ): Promise<Rutina[]> {
    return await this.rutinaService.getRutinas(
      page,
      limit,
      category,
      location,
      difficultyLevel,
      search,
    );
  }

  @Get(':id')
  async getRutinaById(@Param('id') id: UUID) {
    return await this.rutinaService.getRutinaById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async createRutina(@Req() req, @Body() rutina: CreateRutinaDto) {
    const userId = req.user.sub;
    return await this.rutinaService.createRutina(rutina, userId);
  }

  @Post('create-order')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.ENTRENADOR,
    UserRole.USER,
  )
  @UseGuards(AuthGuard, RolesGuard)
  async createOrder(@Req() req, @Res() res: Response) {
    const result = await this.rutinaService.createOrderRoutine(req, res);
    return result;
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async updateRutina(
    @Req() req,
    @Body() rutina: UpdateRutinaDto,
    @Param('id') id: UUID,
  ) {
    const user = req.user;
    return await this.rutinaService.updateRutina(rutina, id, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteRutina(@Req() req, @Param('id') id: UUID) {
    const user = req.user;
    return await this.rutinaService.deleteRutina(id, user);
  }

  @Post('webhook')
  @UseGuards(AuthGuard)
  async webhook(@Req() req, @Res() res) {
    const data = req.body;
    const userId = req.user.sub;
    return await this.rutinaService.webhook(data, userId);
  }
}
