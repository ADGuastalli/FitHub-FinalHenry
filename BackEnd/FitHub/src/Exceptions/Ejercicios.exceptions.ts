import {
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

export class EjercicioNoEncontradoException extends NotFoundException {
  constructor() {
    super('Ejercicio no encontrado');
  }
}

export class EjercicioCreacionFallidaException extends BadRequestException {
  constructor() {
    super('No se pudo crear el ejercicio');
  }
}

export class EjercicioActualizacionFallidaException extends BadRequestException {
  constructor() {
    super('No se pudo actualizar el ejercicio');
  }
}

export class UsuarioNoEncontradoException extends NotFoundException {
  constructor() {
    super('Usuario no encontrado');
  }
}

export class EjerciciosNoEncontradosException extends ConflictException {
  constructor() {
    super('Ejercicios no encontrados');
  }
}
