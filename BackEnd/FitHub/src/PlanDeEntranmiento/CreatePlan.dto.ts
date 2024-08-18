/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  IsUUID,
} from 'class-validator';
import { DifficultyLevel } from './difficultyLevel.enum';
import { UUID } from 'crypto';

export class PlanCreateDto {
  /**
   * Nombre del plan
   * @example "Plan de Entrenamiento Básico"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Lista de UUIDs de las categorías
   * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
   */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  category: UUID[];

  /**
   * Descripción del plan
   * @example "Este plan está diseñado para principiantes."
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Ubicación del plan
   * @example "Gimnasio Central"
   */
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  /**
   * Nivel de dificultad del plan
   * @example "Easy"
   */
  @IsEnum(DifficultyLevel)
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;

  @IsNumber()
  price: number;



  @IsString()
  @IsOptional()
  imgUrl: string;
}

export class PlanUpdateDto {
  /**
   * Nombre del plan (opcional)
   * @example "Plan de Entrenamiento Avanzado"
   */
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  /**
   * Lista de UUIDs de las categorías a actualizar
   * @example ["d4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d", "e4e5f6e7-8e4e-4aee-bbe4-fff67f46b33d"]
   */
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  categoryToUpdate: UUID[];

  /**
   * Descripción del plan (opcional)
   * @example "Este plan está diseñado para usuarios avanzados."
   */
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  /**
   * Ubicación del plan (opcional)
   * @example "Gimnasio Norte"
   */
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  imgUrl?: string;

  /**
   * Nivel de dificultad del plan (opcional)
   * @example "Advanced"
   */
  @IsEnum(DifficultyLevel)
  @IsOptional()
  @IsNotEmpty()
  difficultyLevel: DifficultyLevel;
}
