import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EjercicioService } from './Ejercicios.service';
import { Ejercicio } from './Ejercicios.entity';
import { UUID } from 'crypto';
import { EjercicioDto } from './CreateEjercicio.dto';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import { Request } from 'express';

@ApiTags('Ejercicios')
@Controller('ejercicio')
export class EjercicioController {
  constructor(private readonly ejercicioService: EjercicioService) {}

  @Get()
  async getEjercicios(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10000',
    @Query('titulo') titulo?: string,
    @Query('descripcion') descripcion?: string,
    @Query('search') search?: string,
  ): Promise<Ejercicio[]> {
    return await this.ejercicioService.getEjercicios(
      page,
      limit,
      titulo,
      descripcion,
      search,
    );
  }

  @Get('entrenador')
  @UseGuards(AuthGuard)
  async getEjerciciosPropios(@Req() req) {
    const id = req.user.sub;
    console.log(id);
    if (!id || undefined || null) {
      throw new BadRequestException('Sin acceso a la información');
    }
    return await this.ejercicioService.getEjerciciosPropios(id);
  }

  @Get(':id')
  async getEjercicioById(@Param('id') id: UUID) {
    return await this.ejercicioService.getEjerciciosById(id);
  }

  //Bloquear para usuarios no coach
  @UseGuards(AuthGuard)
  @Post()
  async createEjercicio(@Req() req, @Body() ejercicio: EjercicioDto) {
    const userId = req.user.sub;
    return await this.ejercicioService.createEjercicio(ejercicio, userId);
  }

  @Put(':id')
  async updateEjercicio(
    @Body() ejercicio: EjercicioDto,
    @Param('id') id: UUID,
  ) {
    return await this.ejercicioService.updateEjercicio(ejercicio, id);
  }
}
