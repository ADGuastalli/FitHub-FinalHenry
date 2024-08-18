import { InjectRepository } from '@nestjs/typeorm';
import { Rutina } from './Rutina.entity';
import { ILike, In, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/Category/Category.entity';
import { CreateRutinaDto } from './Rutinas.Dto';
import { Users } from 'src/User/User.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { SolicitudState, UserRole } from 'src/User/User.enum';
import { Preference } from 'mercadopago';
import { client } from 'config/mercadoPagoRoutine.config';
import { error } from 'console';
import { decrypt } from 'dotenv';
import { ReciboService } from 'src/Recibo/recibo.service';
import { CreateReciboDto } from 'src/Recibo/createRecibo.dto';
import { Request, Response } from 'express';
import { StateRecibo } from 'src/Recibo/recibo.enum';
import axios from 'axios';
import { Pago } from 'src/Pagos/Pagos.entity';

@Injectable()
export class RutinaRepository {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Ejercicio)
    private exerciceRepository: Repository<Ejercicio>,
    private readonly reciboService: ReciboService,
  ) {}
  async getAllRutinas(
    page: number,
    limit: number,
    category?: string,
    location?: string,
    difficultyLevel?: string,
    search?: string,
  ) {
    let whereConditions: any = { isActive: true };

    if (category) {
      const categoria = await this.categoryRepository.findOne({
        where: { id: category },
      });
      whereConditions.category = categoria;
    }

    if (location) {
      whereConditions.location = location;
    }

    if (difficultyLevel) {
      whereConditions.difficultyLevel = difficultyLevel;
    }
    if (search) {
      const stopWords = new Set(['de', 'y', 'el', 'la', 'en', 'a', 'o']); // Lista de palabras de parada
      const arrSearch = search
        .split(' ')
        .filter(
          (term) => term.trim() !== '' && !stopWords.has(term.toLowerCase()),
        );

      whereConditions = arrSearch.map((term) => ({
        ...whereConditions,
        name: ILike(`%${term}%`),
      }));
    }
    console.log(whereConditions);
    return await this.rutinaRepository.find({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category', 'exercise'],
    });
  }
  async getRutinaById(id) {
    return await this.rutinaRepository.findOne({
      where: { id, isActive: true },
      relations: ['category', 'exercise', 'recibo', 'comments'],
    });
  }
  async createRutina(rutina: CreateRutinaDto, userId: string) {
    const admin = await this.userRepository.findOne({ where: { id: userId } });
    if (!admin) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const category = await this.categoryRepository.find({
      where: { id: In(rutina.category) },
    });
    if (!category.length) {
      throw new BadRequestException('Categoria no encontrada');
    }

    const exercise = await this.exerciceRepository.find({
      where: { id: In(rutina.exercise) /*user: { id: userId }*/ },
      //relations: ['user'],
    });

    if (!exercise.length) {
      throw new BadRequestException('Ejercicio no encontrado');
    }
    return await this.rutinaRepository.save({
      ...rutina,
      admin,
      category,
      exercise,
    }); //Este metodo cambie por create
  }

  async updateRutina(rutina, id, user) {
    const userAdmin = await this.userRepository.findOne({
      where: { id: user.sub },
    });
    if (userAdmin.role !== UserRole.ADMIN && userAdmin.role !== UserRole.SUPERADMIN) {
      const rutinaToUpdate = await this.rutinaRepository.findOne({
        where: { id: id, admin: userAdmin },
      });
      if (!rutinaToUpdate || rutinaToUpdate.isActive === false) {
        throw new NotFoundException('Rutina no encontrada o eliminada');
      }
      if (rutina.category) {
        const category = await this.categoryRepository.find({
          where: { id: In(rutina.category) },
        });
        if (category.length !== rutina.category.length) {
          throw new NotFoundException('Categoría no encontrada');
        }
        rutinaToUpdate.category = category;
        await this.rutinaRepository.save(rutinaToUpdate);
      }

      if(rutina.exercise){
        const exercise = await this.exerciceRepository.find({
          where: { id: In(rutina.exercise) },
        });
        if (exercise.length !== rutina.exercise.length) {
          throw new NotFoundException('Ejercicio no encontrado');
        }
        rutinaToUpdate.exercise = exercise;
        await this.rutinaRepository.save(rutinaToUpdate);
      }
      const { category, exercise, ...rutinaSinCategory } = rutina;

       await this.rutinaRepository.update(id, rutinaSinCategory);
    } else {
      const rutinaToUpdate = await this.rutinaRepository.findOne({
        where: { id: id },
      });
      if (!rutinaToUpdate || rutinaToUpdate.isActive === false) {
        throw new NotFoundException('Rutina no encontrada o eliminada');
      }
      if (rutina.category) {
        const category = await this.categoryRepository.find({
          where: { id: In(rutina.category) },
        });
        if (category.length !== rutina.category.length) {
          throw new NotFoundException('Categoría no encontrada');
        }
        rutinaToUpdate.category = category;
        await this.rutinaRepository.save(rutinaToUpdate)
      }
      if(rutina.exercise){
        const exercise = await this.exerciceRepository.find({
          where: { id: In(rutina.exercise) },
        });
        if (exercise.length !== rutina.exercise.length) {
          throw new NotFoundException('Ejercicio no encontrado');
        }
        rutinaToUpdate.exercise = exercise;
        await this.rutinaRepository.save(rutinaToUpdate);
      }
      const { category, exercise, ...rutinaSinCategory } = rutina;
      rutinaSinCategory.check = SolicitudState.PENDING;
      return await this.rutinaRepository.update(id, rutinaSinCategory);
    }
  }
  async deleteRutina(id, user) {
    const rutina = await this.rutinaRepository.findOne({
      where: { id },
      relations: ['admin'],
    });

    if (!rutina || rutina.isActive === false) {
      throw new NotFoundException('Rutina no encontrada o eliminada');
    }

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPERADMIN) {
      const userSolicitud = await this.userRepository.findOne({
        where: { id: user.sub },
      });
      if (rutina.admin.id !== userSolicitud.id) {
        throw new ForbiddenException(
          'No tines capacidad de eliminar esta rutina',
        );
      }
      await this.rutinaRepository.update(id, { isActive: false });
      return 'Rutina eliminada';
    } else {
      await this.rutinaRepository.update(id, { isActive: false });
      return 'Rutina eliminada';
    }
  }

  ////////////////////////////////Mercado Pago///////////////////////////////////////////

  async createOrderRoutine(req, res) {
    const userId = req.user.sub;
    const rutinaId = req.body.rutinaId;

    try {
      const user = await this.userRepository.findOne({
        where: { id: userId, isActive: true },
        relations: ['routine'],
      });
      console.log(user);
      if (!user) {
        throw new ConflictException('Usuario no encontrado');
      }
      if (user.routine.some((r) => r.id === rutinaId)) {
        throw new BadRequestException(
          'Usted ya ha comprado anteriormente esta rutina',
        );
      }
      const rutina = await this.rutinaRepository.findOne({
        where: { id: rutinaId },
      });
      if (!rutina) {
        throw new ConflictException('Rutina no encontrada');
      }

      const body = {
        items: [
          {
            id: req.body.id,
            title: req.body.title,
            rutinaId: req.body.rutinaId,
            quantity: 1,
            unit_price: Number(req.body.unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://fit-hub-front-end.vercel.app/mercadoPagoRutina/success',
          failure: 'https://fit-hub-front-end.vercel.app/mercadoPagoRutina/failure',
        },
        auto_return: 'approved',
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });

      this.pagoRepository.save({
        preferenceId: result.id,
        idUsuario: userId,
        idPago: req.body.rutinaId,
      });

      res.json({ id: result.id });
    } catch (error) {
      console.error(error);
      res.status(400).send('Error al crear la preferencia de pago');
    }
  }

  async webhook(data, userId) {
    const preferencia = await this.pagoRepository.findOne({
      where: { preferenceId: data.preference_id },
    });
    const rutinaId = preferencia.idPago;
    console.log('asdasdlk.......', rutinaId);
    if (!rutinaId) {
      throw new BadRequestException('no entro');
    }
    const status = data.status;
    if (preferencia.estado === true) {
      if (status === 'approved') {
        const compradorUser = await this.userRepository.findOne({
          where: { id: userId },
          relations: ['routine'],
        });
        await this.pagoRepository.update(data.preference_id, { estado: false });
        if (!compradorUser) {
          throw new ConflictException('Usuario no encontrado');
        }

        const rutina = await this.rutinaRepository.findOne({
          where: { id: rutinaId },
        });
        if (!rutina) {
          throw new ConflictException('Usuario no encontrado');
        }
        console.log(
          '............llamar la atencion.......',
          compradorUser.routine,
        );
        compradorUser.routine.push(rutina);
        await this.userRepository.save(compradorUser);

        const reciboData = {
          user: compradorUser,
          rutinas: [rutina],
          planes: [],
          price: null,
          state: StateRecibo.PAGADO,
        };

        const reciboGuardado =
          await this.reciboService.createRecibo(reciboData);
        return 'recibo realizado, compra finalizada';
      }
      return 'no se pudo realizar la compra';
    }
  }
}
