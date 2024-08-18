import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { FilesUploadService } from './files-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { FilesUploadRepository } from './files-upload.repository';
import { CloudinaryConfig } from 'config/cloudinary';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ejercicio, Rutina, Users]),
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [FilesUploadController],
  providers: [FilesUploadService, FilesUploadRepository, CloudinaryConfig],
  exports: [FilesUploadService, FilesUploadRepository],
})
export class FilesUploadModule {}
