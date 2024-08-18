import { NotFoundException, BadRequestException } from '@nestjs/common';

export class ComentarioNoEncontradoException extends NotFoundException {
  constructor() {
    super('Comentario no encontrado');
  }
}

export class ComentarioInactivoException extends BadRequestException {
  constructor() {
    super('El comentario ya está inactivo');
  }
}

export class ComentarioCreacionFallidaException extends BadRequestException {
  constructor() {
    super('No se pudo crear el comentario');
  }
}

export class ComentarioActualizacionFallidaException extends BadRequestException {
  constructor() {
    super('No se pudo actualizar el comentario');
  }
}
