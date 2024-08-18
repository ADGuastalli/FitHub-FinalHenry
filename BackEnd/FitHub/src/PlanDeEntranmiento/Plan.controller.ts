/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
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
import { PlanService } from './Plan.service';
import { Plan } from './Plan.entity';
import { UUID } from 'crypto';
import { ApiTags } from '@nestjs/swagger';
import { PlanCreateDto, PlanUpdateDto } from './CreatePlan.dto';
import { Category } from 'src/Category/Category.entity';
import { query, Request } from 'express';
import { DifficultyLevel } from './difficultyLevel.enum';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import { Console } from 'console';
import * as mercadopago from 'mercadopago';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles, UserRole } from 'src/User/User.enum';
import { RolesGuard } from 'src/Guard/roles.guard';
@ApiTags('Planes de Entrenamiento')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getPlan(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
    @Query('location') location?: string,
    @Query('difficultyLevel') difficultyLevel?: DifficultyLevel,
    @Query('search') search?: string,
  ): Promise<Plan[]> {
    return await this.planService.getPlan(
      page,
      limit,
      category,
      location,
      difficultyLevel,
      search,
    );
  }

  @Get(':id')
  async getPlanById(@Param('id') id: UUID) {
    return await this.planService.getPlanById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async createPlan(@Req() req, @Body() plan: PlanCreateDto) {
    const user = req.user;
    const admin = user.sub;
    return await this.planService.createPlan(plan, admin);
  }

  @Post('create-order')
  @Roles(
    UserRole.ADMIN,
    UserRole.SUPERADMIN,
    UserRole.ENTRENADOR,
    UserRole.USER,
  )
  @UseGuards(AuthGuard, RolesGuard)
  async createSubscription(@Req() req, @Res() res) {
    const result = await this.planService.createSubscription(req, res);
    return result;
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async updatePlan(
    @Req() req,
    @Body() plan: PlanUpdateDto,
    @Param('id') id: UUID,
  ) {
    const user = req.user;
    const admin = user.sub;
    const identifiacion = id;
    return await this.planService.updatePlan(plan, identifiacion, admin);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.ENTRENADOR)
  @UseGuards(AuthGuard, RolesGuard)
  async deletePlan(@Req() req, @Param('id') id: UUID) {
    const user = req.user;
    return await this.planService.deletePlan(id, user);
  }

  @Post('webhook')
  @UseGuards(AuthGuard)
  async webhook(@Req() req, @Res() res) {
    const data = req.body;
    const userId = req.user.sub;
    return await this.planService.webhook(data, userId);
  }
}
