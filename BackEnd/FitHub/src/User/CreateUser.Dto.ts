/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  /**
    * El nombre del usuario
    * @example Julian Gomez
  */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Julian Gomez',
  })
  name: string;

  /**
    * El email del usuario
    * @example usuario@ejemplo.com
  */
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El email del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  /**
    * Documento Nacional de Identidad (DNI) del usuario
    * @example 12345678
  */
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Documento Nacional de Identidad (DNI) del usuario',
    example: 12345678,
  })
  dni: number;

  /**
    * La contraseña del usuario debe tener al menos: una mayuscula, una minuscula, un numero, un carácter especial. Y debe tener de 8 a 15 dígitos
    * @example 12345678aA!
  */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  @ApiProperty({
    description:
      'La contraseña del usuario debe tener al menos: una mayúscula, una minúscula, un número, un carácter especial. Y debe tener de 8 a 15 dígitos',
    example: '12345678aA!',
  })
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
  @ApiProperty({
    description: 'La contraseña debe coincidir con la anterior',
    example: '12345678aA!',
  })
  passwordConfirm: string;

  /**
    * Número de teléfono celular del usuario, con 10 cifras
    * @example 2664404040
    */
  @IsNumber()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Número de teléfono celular del usuario, con 10 cifras',
    example: 2664404040,
  })
  phone: number;

  /**
    * País de residencia del usuario
    * @example Argentina
    */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'País de residencia del usuario',
    example: 'Argentina',
  })
  country: string;

  /**
    * Dirección de residencia del usuario
    * @example Calle Falsa 123
    */
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  @ApiProperty({
    description: 'Dirección de residencia del usuario',
    example: 'Calle Falsa 123',
  })
  address: string;

  /**
    * Ciudad de residencia del usuario
    * @example San Luis
    */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({
    description: 'Ciudad de residencia del usuario',
    example: 'San Luis',
  })
  city: string;
}

export class UpdateUserDto {
  /**
    * El nombre del usuario (opcional)
    * @example Julian Gomez
    */
  @IsString()
  @IsOptional()
  @Length(3, 80)
  @ApiPropertyOptional({
    description: 'El nombre del usuario // Puede ser pasado o no',
    example: 'Julian Gomez',
  })
  name?: string;
  
  /**
    * La contraseña del usuario (opcional)
    * @example 12345678aA!
    */
  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'Contraseña no cumple con los requisitos minimos' },
  )
  @ApiPropertyOptional({
    description: 'La contraseña del usuario // Puede ser pasada o no',
    example: '12345678aA!',
  })
  password?: string;

  /**
    * Número de teléfono celular del usuario, con 10 cifras (opcional)
    * @example 2664404040
    */
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(1000000000)
  @Max(9999999999)
  @ApiPropertyOptional({
    description: 'Número de teléfono celular del usuario, con 10 cifras // Puede ser pasado o no',
    example: 2664404040,
  })
  phone?: number;

    /**
    * País de residencia del usuario (opcional)
    * @example Argentina
    */
  @IsString()
  @IsOptional()
  @Length(5, 20)
  @ApiPropertyOptional({
    description: 'País de residencia del usuario // Puede ser pasado o no',
    example: 'Argentina',
  })
  pais?: string;

  /**
    * País de residencia del usuario (opcional)
    * @example Argentina
    */
  @IsString()
  @IsOptional()
  @Length(3, 100)
  @ApiPropertyOptional({
    description: 'Dirección de residencia del usuario // Puede ser pasada o no',
    example: 'Calle Falsa 123',
  })
  direccion?: string;

  /**
    * Ciudad de residencia del usuario (opcional)
    * @example Villa Mercedes
    */
  @IsString()
  @IsOptional()
  @Length(5, 30)
  @ApiPropertyOptional({
    description: 'Ciudad de residencia del usuario // Puede ser pasada o no',
    example: 'Villa Mercedes',
  })
  ciudad?: string;
}
