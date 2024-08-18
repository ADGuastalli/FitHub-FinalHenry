import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.Dto';
import { UsersRepository } from './User.repository';
import { solicitudCoachDto } from './SolicitudCoachDto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getAllUsers();
  }

  getCoach() {
    return this.usersRepository.getCoach();
  }

  getUsersById(id: string, idUser) {
    if (id === idUser) {
      return this.usersRepository.getUserById(id);
    }
    throw new BadRequestException('No tienes acceso a esta informacion');
  }

  getUserByIdPyR(id: string, idUser) {
    if (id === idUser) {
      return this.usersRepository.getUserByIdPyR(id);
    }
    throw new BadRequestException('No tienes acceso a esta informacion');
  }
  getEntrenadorByIdPyR(id: string, idUser) {
    if (id === idUser) {
      return this.usersRepository.getEntrenadorByIdPyR(id);
    }
    throw new BadRequestException('No tienes acceso a esta informacion');
  }

  createUser(user: CreateUserDto) {
    return this.usersRepository.createUser(user);
  }

  solicitudCoach(userId: string, body:solicitudCoachDto) {
    return this.usersRepository.solicitudCoach(userId, body);
  }

  updateUser(user, id: string) {
    return this.usersRepository.updateUser(user, id);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }
}

