import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Puntuacion } from 'src/Dto/Puntuacion.Dto';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';

export class CommentDto {
  /**
   * Descripción del comentario
   * @example "Este es un comentario sobre la rutina de entrenamiento."
   */
  @IsString()
  @IsNotEmpty()
  description?: string;

  /**
   * Puntuación sobre el comentario
   * @example "Se puntúa del 1 a 5."
   */
  @IsEnum(Puntuacion)
  @IsNotEmpty()
  score?: Puntuacion;

  /**
   * ID de la rutina sobre la que se puntúa.
   */
  @IsUUID()
  routine?: Rutina;

  /**
   * ID del plan sobre el que se puntúa.
   */
  @IsOptional()
  @IsUUID()
  plan?: Plan;
}
