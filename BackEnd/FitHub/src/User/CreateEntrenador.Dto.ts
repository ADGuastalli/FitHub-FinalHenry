import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { UserRole } from './User.enum';

export class CreateEntrenadorDto {
  /**
   * El nombre del usuario
   * @example Julian Gomez
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  /**
   * El email del usuario
   * @example usuario@ejemplo.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * La contraseña del usuario debe tener al menos: una mayuscula,una minuscula, un numero, un carcater especial. Y debe tener de 8 a 15 digitos
   * @example 12345678aA!
   */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  password: string;

  /**
   * La contraseña debe coincidir con la anterior
   * @example 12345678aA!
   */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  passwordConfirm: string;

  /**
   * Rol del usuario
   * @example UserRole.ENTRENADOR
   */
  @IsEnum(UserRole)
  isAdmin: UserRole.ENTRENADOR;

  /**
   * Numero de telefono celular del usuario, con 10 cifras
   * @example 2664404040
   */
  @IsNumber()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @IsNotEmpty()
  phone: number;

  /**
   * Pais de residencia del usuario
   * @example Argentina
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  pais: string;

  /**
   * Direccion de residencia del usuario
   * @example Calle Falsa 123
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  direccion: string;

  /**
   * Ciudad de residencia del usuario
   * @example San Luis
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  ciudad: string;
}
