import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { AuthModule } from 'src/Auth/Auth.module';
import { usersModule } from 'src/User/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { CategoryModule } from 'src/Category/Category.module';
import { EjercicoModule } from 'src/Ejercicios/Ejercicios.module';
import { UsersRepository } from 'src/User/User.repository';
import { PlanModule } from 'src/PlanDeEntranmiento/Plan.module';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { PlanService } from 'src/PlanDeEntranmiento/Plan.service';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { RutinaModule } from 'src/Rutina/Rutina.module';

@Module({
  imports: [
    RutinaModule,
    PlanModule,
    EjercicoModule,
    CategoryModule,
    AuthModule,
    usersModule,
    FilesUploadModule,
    TypeOrmModule.forFeature([Users, Plan]),
  ],
  providers: [SeederService, UsersRepository, PlanService],
  controllers: [SeederController],
})
export class SeederModule {}
