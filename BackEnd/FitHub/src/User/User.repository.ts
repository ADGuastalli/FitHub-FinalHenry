import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './User.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './CreateUser.Dto';
import { SolicitudState, UserRole } from './User.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getAllUsers() {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
        isActive: true,
      },
      relations: ['routine', 'subsciption.plan'],
    });
  }


  async getCoach() {
    const allCoach = await this.userRepository.find({
      where: { role: UserRole.ENTRENADOR, isActive: true },
    });

    return allCoach;
  }

  async getUserByIdPyR(id) {
    const userRyP = await this.userRepository.findOne({
      where: { id, isActive: true },
      select: ['id'],
      relations: ['routine', 'subsciption.plan'],
    });

    return {
      id: userRyP.id,
      routine: userRyP.routine,
      subsciption: userRyP.subsciption,
    };
  }

  async getEntrenadorByIdPyR(id) {
    const entrenadorRyP = await this.userRepository.findOne({
      where: { id, isActive: true },
      select: ['id'],
      relations: ['routineAdmin', 'planAdmin', 'exercise'],
    });

    return {
      id: entrenadorRyP.id,
      routineAdmin: entrenadorRyP.routineAdmin,
      planAdmin: entrenadorRyP.planAdmin,
      exercise: entrenadorRyP.exercise,
    };
  }

  async solicitudCoach(userId, body) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.solicitud === SolicitudState.NONE || user.solicitud === SolicitudState.CORRECTION) {
      await this.userRepository.update(userId, { ...user, solicitud:SolicitudState.PENDING, cvpdf: body.cvpdf, cvvideo: body.cvvideo });
      return 'Solicitud enviada';
    } else if(user.solicitud === 'pending') {
      return 'Ya tienes una solicitud pendiente';
    } else if(user.solicitud === SolicitudState.ACCEPTED) {
      return 'Ya eres entrenador';
    } else if(user.solicitud === SolicitudState.DENIED) {
      return 'Tu solicitud fue denegada, no puedes enviar otra solicitud, contacta con soporte';
    }
  }

  async createUser(user: CreateUserDto) {
    const createdUser = await this.userRepository.save(user);
    return createdUser.id;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    const userUpdated = await this.userRepository.update(id, user);

    return userUpdated;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.findOneBy({ id });
    if (!deletedUser || deletedUser.isActive === false) {
      throw new NotFoundException('Plan no encontrado o eliminado');
    }
    await this.userRepository.update(id, { ...deletedUser, isActive: false });
    return id;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email, isActive: true });
  }
}
