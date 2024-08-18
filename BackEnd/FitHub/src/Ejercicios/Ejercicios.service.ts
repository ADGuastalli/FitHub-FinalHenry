import { Injectable } from '@nestjs/common';
import { EjercicioRepository } from './Ejercicios.repository';
import { EjercicioDto } from './CreateEjercicio.dto';

@Injectable()
export class EjercicioService {
  constructor(private readonly ejercicioRepository: EjercicioRepository) {}

  async getEjercicios(
    page: string,
    limit: string,
    titulo?: string,
    descripcion?: string,
    search?: string,
  ) {
    return await this.ejercicioRepository.getEjercicios(
      Number(page),
      Number(limit),
      titulo,
      descripcion,
      search,
    );
  }

  async getEjerciciosById(id: string) {
    return await this.ejercicioRepository.getEjercicioById(id);
  }

  async createEjercicio(ejercicio: EjercicioDto, userId: string) {
    return await this.ejercicioRepository.createEjercicio(ejercicio, userId);
  }

  async updateEjercicio(ejercicio: EjercicioDto, id: string) {
    return await this.ejercicioRepository.updateEjercicio(id, ejercicio);
  }

  async getEjerciciosPropios(id) {
    return await this.ejercicioRepository.getEjerciciosPropios(id);
  }
}
