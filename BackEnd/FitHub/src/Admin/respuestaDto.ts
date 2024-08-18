import { IsArray, IsNotEmpty } from 'class-validator';

export class respuestaDto {
  @IsArray()
  coach: string[];

  @IsArray()
  plan: string[];

  @IsArray()
  rutina: string[];
}
