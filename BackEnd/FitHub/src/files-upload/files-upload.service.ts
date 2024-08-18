import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Repository } from 'typeorm';
import { FilesUploadRepository } from './files-upload.repository';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';
import {
  ActualizacionEjercicioFallidaException,
  ActualizacionRutinaFallidaException,
  ActualizacionUsuarioFallidaException,
  ArchivosNoSubidosException,
  EjercicioNoEncontradoException,
  FormatoNoPermitidoException,
  RutinaNoEncontradaException,
  UsuarioNoEncontradoException,
} from 'src/Exceptions/Files.exceptions';

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly filesUploadRepository: FilesUploadRepository,
    @InjectRepository(Ejercicio)
    private readonly ejerciciosRepository: Repository<Ejercicio>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async uploadFilesEjercicio(
    files: Express.Multer.File[],
    ejercicioId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const ejercicio = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!ejercicio) {
      throw new EjercicioNoEncontradoException();
    }
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new ArchivosNoSubidosException();
    }
    const fileUrls = uploadResults.map((result) => result.secure_url);
    await this.ejerciciosRepository.update(ejercicioId, {
      imgUrl: fileUrls,
    });
    const updatedEjercicio = await this.ejerciciosRepository.findOneBy({
      id: ejercicioId,
    });
    if (!updatedEjercicio) {
      throw new ActualizacionEjercicioFallidaException();
    }
    return updatedEjercicio;
  }

  async uploadFilesRutina(
    files: Express.Multer.File[],
    rutinaId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const rutina = await this.rutinaRepository.findOneBy({ id: rutinaId });
    if (!rutina) {
      throw new RutinaNoEncontradaException();
    }
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new ArchivosNoSubidosException();
    }
    const fileUrls = uploadResults.map((result) => result.secure_url);
    await this.rutinaRepository.update(rutinaId, {
      imgUrl: fileUrls,
    });
    const updatedRutina = await this.rutinaRepository.findOneBy({
      id: rutinaId,
    });
    if (!updatedRutina) {
      throw new ActualizacionRutinaFallidaException();
    }
    return updatedRutina;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    rutinaId: string,
    resourceType: 'auto' | 'image' | 'video' = 'auto',
  ) {
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new ArchivosNoSubidosException();
    }
    const fileUrls = uploadResults.map((result) => result.secure_url);
    return fileUrls;
  }

  async uploadPdfFiles(files: Express.Multer.File[]) {
    files.forEach((file) => {
      if (file.mimetype !== 'application/pdf') {
        throw new FormatoNoPermitidoException();
      }
    });

    const uploadResults =
      await this.filesUploadRepository.uploadPdfFiles(files);

    if (uploadResults.length === 0) {
      throw new ArchivosNoSubidosException();
    }

    const fileUrls = uploadResults.map((result) => result.secure_url);
    return fileUrls;
  }

  async uploadImageProfile(
    files: Express.Multer.File[],
    userId: string,
    resourceType: 'auto' | 'image' = 'auto',
  ) {
    const uploadResults = await this.filesUploadRepository.uploadFiles(
      files,
      resourceType,
    );
    if (uploadResults.length === 0) {
      throw new ArchivosNoSubidosException();
    }
    const imgUrl = uploadResults[0].secure_url;

    const userUpdateResult = await this.usersRepository.update(userId, {
      imgUrl,
    });

    if (!userUpdateResult.affected) {
      throw new ActualizacionUsuarioFallidaException();
    }

    const updatedUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!updatedUser) {
      throw new UsuarioNoEncontradoException();
    }
    return updatedUser;
  }
}
