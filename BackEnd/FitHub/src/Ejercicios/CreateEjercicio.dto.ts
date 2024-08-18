import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EjercicioDto {
  /**
   * Título del ejercicio
   * @example "Flexiones de Pecho"
   */
  @IsNotEmpty()
  titulo: string;

  /**
   * Descripción del ejercicio
   * @example "Ejercicio para fortalecer los músculos del pecho"
   */
  @IsNotEmpty()
  descripcion: string;

  /**
   * URL(s) de la(s) imagen(es) del ejercicio (opcional)
   * @example ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
   */
  @IsOptional()
  imgUrl: string[];

  @IsString()
  videoUrl: string;
}
