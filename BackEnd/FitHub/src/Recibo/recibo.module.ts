import { Module } from '@nestjs/common';
import { ReciboController } from './recibo.controller';
import { ReciboService } from './recibo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recibo } from './recibo.entity';
import { ReciboRepository } from './recibo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Recibo])],
  controllers: [ReciboController],
  providers: [ReciboService, ReciboRepository],
  exports: [ReciboService],
})
export class ReciboModule {}
