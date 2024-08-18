import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class AdminPermissionException extends ForbiddenException {
  constructor() {
    super('No tienes permisos para realizar esta acción');
  }
}

export class NoPendingRequestsException extends BadRequestException {
  constructor() {
    super('No hay solicitudes pendientes');
  }
}

export class AlreadyDeniedException extends BadRequestException {
  constructor(entity: string) {
    super(`La solicitud ya ha sido denegada para ${entity}`);
  }
}

export class AlreadyAcceptedException extends BadRequestException {
  constructor(entity: string) {
    super(`La solicitud ya ha sido aceptada para ${entity}`);
  }
}

export class AlreadyInCorrectionException extends BadRequestException {
  constructor(entity: string) {
    super(`La solicitud ya está en corrección para ${entity}`);
  }
}
