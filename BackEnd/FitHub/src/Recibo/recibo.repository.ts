import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recibo } from './recibo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReciboDto } from './createRecibo.dto';
import { UUID } from 'crypto';

@Injectable()
export class ReciboRepository {
  constructor(
    @InjectRepository(Recibo)
    private readonly reciboRepository: Repository<Recibo>,
  ) {}

  async createRecibo(recibo: CreateReciboDto) {
    const reciboCreado = await this.reciboRepository.create(recibo);
    await this.reciboRepository.save(reciboCreado);
    return reciboCreado;
  }

  async getAllRecibos() {
    return await this.reciboRepository.find({ relations: ['rutina'] });
  }

  async getReciboById(id: string) {
    const reciboBuscado = await this.reciboRepository.findOne({
      where: { id },
      relations: ['plan', 'rutina', 'user'],
    });
    if (!reciboBuscado) {
      throw new NotFoundException('Recibo no encontrado');
    }
    return reciboBuscado;
  }
}
