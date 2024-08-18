import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StateRecibo } from './recibo.enum';
import { Users } from 'src/User/User.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';

export class CreateReciboDto {
  @IsUUID('all')
  @IsNotEmpty()
  user: Users;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  plan?: Plan;

  @IsUUID(undefined, { each: true })
  @IsOptional()
  rutinas?: Rutina[];

  @IsNumber()
  price: number;

  @IsString()
  state: StateRecibo;
}
