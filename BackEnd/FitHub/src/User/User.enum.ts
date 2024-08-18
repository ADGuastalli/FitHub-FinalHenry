import { SetMetadata } from '@nestjs/common';

export enum UserRole {
  SUPERADMIN= 'superadmin',
  ADMIN = 'admin',
  ENTRENADOR = 'entrenador',
  USER = 'user',
}
export enum SolicitudState {
  NONE = 'none',
  PENDING = 'pending',
  CORRECTION = 'correction',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}

export const Roles = (...role: UserRole[]) => SetMetadata('role', role);
