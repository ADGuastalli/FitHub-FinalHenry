import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ArchivosNoSubidosException extends NotFoundException {
  constructor() {
    super('No se pudieron cargar los archivos');
  }
}

export class EjercicioNoEncontradoException extends NotFoundException {
  constructor() {
    super('Ejercicio no encontrado');
  }
}

export class RutinaNoEncontradaException extends NotFoundException {
  constructor() {
    super('Rutina no encontrada');
  }
}

export class UsuarioNoEncontradoException extends NotFoundException {
  constructor() {
    super('Usuario no encontrado');
  }
}

export class ActualizacionEjercicioFallidaException extends InternalServerErrorException {
  constructor() {
    super('No se pudo actualizar la información del ejercicio');
  }
}

export class ActualizacionRutinaFallidaException extends InternalServerErrorException {
  constructor() {
    super('No se pudo actualizar la información de la rutina');
  }
}

export class ActualizacionUsuarioFallidaException extends InternalServerErrorException {
  constructor() {
    super('No se pudo actualizar la información del usuario');
  }
}

export class FormatoNoPermitidoException extends BadRequestException {
  constructor() {
    super('Solo se permiten archivos en formato PDF');
  }
}
