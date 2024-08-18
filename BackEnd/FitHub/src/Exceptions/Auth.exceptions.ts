import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AuthException extends BadRequestException {
  constructor(message: string) {
    super(`Authentication Error: ${message}`);
  }
}

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super('El usuario ya existe');
  }
}

export class PasswordMismatchException extends BadRequestException {
  constructor() {
    super('Las contraseñas no coinciden');
  }
}

export class InvalidCredentialsException extends NotFoundException {
  constructor() {
    super('Email o password incorrectos');
  }
}
