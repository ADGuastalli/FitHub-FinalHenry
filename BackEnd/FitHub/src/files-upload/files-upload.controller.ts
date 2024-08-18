import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guard/AuthGuar.guard';

@ApiTags('Archivos')
@Controller('files')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post('ejercicio/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFilesEjercicio(
    @Param('id') ejercicioId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1500000,
            message: 'Tamaño máximo permitido: 1,5 MB',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp|.mp4|.avi|.mov)/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const resourceType = files[0]?.mimetype.includes('video')
      ? 'video'
      : 'image';
    return this.filesUploadService.uploadFilesEjercicio(
      files,
      ejercicioId,
      resourceType,
    );
  }
  @Post('rutina/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFilesRutina(
    @Param('id') ejercicioId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1500000,
            message: 'Tamaño máximo permitido: 1,5 MB',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp|.mp4|.avi|.mov)/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const resourceType = files[0]?.mimetype.includes('video')
      ? 'video'
      : 'image';
    return this.filesUploadService.uploadFilesRutina(
      files,
      ejercicioId,
      resourceType,
    );
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @Param('id') ejercicioId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1500000,
            message: 'Tamaño máximo permitido: 1,5 MB',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp|.mp4|.avi|.mov)/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const resourceType = files[0]?.mimetype.includes('video')
      ? 'video'
      : 'image';

    return this.filesUploadService.uploadFiles(
      files,
      ejercicioId,
      resourceType,
    );
  }

  @Post('pdf')
  @UseInterceptors(FilesInterceptor('files'))
  uploadPdfFiles(
    @Param('id') ejercicioId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1500000, // 1.5 MB
            message: 'Tamaño máximo permitido: 1,5 MB',
          }),
          new FileTypeValidator({
            fileType: 'application/pdf',
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.filesUploadService.uploadPdfFiles(files);
  }

  @Post('profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  uploadImageProfile(
    @Req() req,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1500000,
            message: 'Tamaño máximo permitido: 1,5 MB',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp)/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const user = req.user;
    const userId = user.sub;
    console.log(userId);
    const resourceType = 'image';

    return this.filesUploadService.uploadImageProfile(
      files,
      userId,
      resourceType,
    );
  }
}
