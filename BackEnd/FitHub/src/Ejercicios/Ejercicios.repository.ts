/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercicio } from './Ejercicios.entity';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { EjercicioDto } from './CreateEjercicio.dto';
import { Users } from 'src/User/User.entity';
import { ILike, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import {
  EjercicioActualizacionFallidaException,
  EjercicioCreacionFallidaException,
  EjercicioNoEncontradoException,
  EjerciciosNoEncontradosException,
  UsuarioNoEncontradoException,
} from 'src/Exceptions/Ejercicios.exceptions';

export class EjercicioRepository {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepository: Repository<Ejercicio>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getEjercicios(
    page: number,
    limit: number,
    titulo?: string,
    descripcion?: string,
    search?: string,
  ) {
    let whereConditions: any = {};
    if (titulo !== undefined) {
      whereConditions.titulo = ILike(`%${titulo}%`);
    }
    if (descripcion !== undefined) {
      whereConditions.descripcion = ILike(`%${descripcion}%`);
    }
    if (search !== undefined) {
      const stopWords = new Set(['de', 'y', 'el', 'la', 'en', 'a', 'o']); // Lista de palabras de parada
      const arrSearch = search
        .split(' ')
        .filter(
          (term) => term.trim() !== '' && !stopWords.has(term.toLowerCase()),
        );

      whereConditions = arrSearch.map((term) => ({
        ...whereConditions,
        titulo: ILike(`%${term}%`),
      }));
    }
    return await this.ejercicioRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getEjercicioById(id) {
    const ejercicio = await this.ejercicioRepository.findOne({ where: { id } });
    if (!ejercicio) {
      throw new EjercicioNoEncontradoException();
    }
    return ejercicio;
  }

  async createEjercicio(ejercicio: EjercicioDto, userId: string) {
    const usuarioAdmin = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!usuarioAdmin) {
      throw new UsuarioNoEncontradoException();
    }

    const exercise = this.ejercicioRepository.create(ejercicio);
    exercise.user = usuarioAdmin;

    try {
      return await this.ejercicioRepository.save(exercise);
    } catch (error) {
      throw new EjercicioCreacionFallidaException();
    }
  }

  async updateEjercicio(ejercicio, id) {
    const existingEjercicio = await this.getEjercicioById(id);
    if (!existingEjercicio) {
      throw new EjercicioNoEncontradoException();
    }

    try {
      await this.ejercicioRepository.update(id, ejercicio);
      return 'El ejercicio se ha actualizado';
    } catch (error) {
      throw new EjercicioActualizacionFallidaException();
    }
  }

  async getEjerciciosPropios(id) {
    const entrenador = await this.userRepository.findOne({ where: { id } });
    if (!entrenador) {
      throw new UsuarioNoEncontradoException();
    }

    const ejerciciosPropios = await this.ejercicioRepository.find({
      where: { user: entrenador },
      relations: ['user'],
    });

    if (!ejerciciosPropios.length) {
      throw new EjerciciosNoEncontradosException();
    }

    return ejerciciosPropios;
  }
}
