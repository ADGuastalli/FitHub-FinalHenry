import { Controller, Get, Param } from '@nestjs/common';
import { ReciboService } from './recibo.service';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@ApiTags('Recibos')
@Controller('recibo')
export class ReciboController {
  constructor(private readonly reciboService: ReciboService) {}

  @Get()
  async getAllRecibos() {
    return await this.reciboService.getAllRecibos();
  }

  @Get(':id')
  async getReciboById(@Param('id') id: string) {
    return await this.reciboService.getReciboById(id);
  }
}
