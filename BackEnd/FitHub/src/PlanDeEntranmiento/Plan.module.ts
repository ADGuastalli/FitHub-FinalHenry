import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './Plan.entity';
import { PlanController } from './Plan.controller';
import { PlanRepository } from './Plan.repository';
import { PlanService } from './Plan.service';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';
import { Users } from 'src/User/User.entity';
import { Category } from 'src/Category/Category.entity';
import { SubscriptionsModule } from 'src/Suscripciones/suscripciones.module';
import { SubscriptionsRepository } from 'src/Suscripciones/suscripciones.repository';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { EjercicioRepository } from 'src/Ejercicios/Ejercicios.repository';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { RutinaRepository } from 'src/Rutina/Rutina.reposity';
import { RutinaModule } from 'src/Rutina/Rutina.module';
import { Pago } from 'src/Pagos/Pagos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, Users, Category, Ejercicio, Pago]),
    SubscriptionsModule,
    FilesUploadModule,
    RutinaModule,
  ],
  providers: [PlanService, PlanRepository, AuthGuard, EjercicioRepository],
  controllers: [PlanController],
  exports: [PlanService, PlanRepository],
})
export class PlanModule {}
