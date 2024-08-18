/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { RutinaRepository } from './Rutina.reposity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { ReciboService } from 'src/Recibo/recibo.service';
import { Request, Response } from 'express';
import { StateRecibo } from 'src/Recibo/recibo.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { Repository } from 'typeorm';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Rutina } from './Rutina.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { CreateReciboDto } from 'src/Recibo/createRecibo.dto';
import { FilesUploadService } from 'src/files-upload/files-upload.service';
import { Preference } from 'mercadopago';
import { planClient } from 'config/mercadoPagoPlan.config';

@Injectable()
export class RutinaService {
  constructor(
    private readonly filesUploadService: FilesUploadService,
    private readonly rutinasRepository: RutinaRepository,
    private readonly reciboService: ReciboService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}

  async getRutinas(
    page: string,
    limit: string,
    category?: string,
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    return await this.rutinasRepository.getAllRutinas(
      Number(page),
      Number(limit),
      category,
      location,
      difficultyLevel,
      search,
    );
  }
  async getRutinaById(id) {
    return await this.rutinasRepository.getRutinaById(id);
  }
  async createRutina(rutina: CreateRutinaDto, userId: string) {
    return await this.rutinasRepository.createRutina(rutina, userId);
  }

  async createOrderRoutine(req, res: Response) {
    const ordenCreada = await this.rutinasRepository.createOrderRoutine(
      req,
      res,
    );
  }
  async updateRutina(rutina, id, user) {
    return await this.rutinasRepository.updateRutina(rutina, id, user);
  }
  async deleteRutina(id, user) {
    return await this.rutinasRepository.deleteRutina(id, user);
  }

  async webhook(data, userId) {
    return await this.rutinasRepository.webhook(data, userId);
  }
}
