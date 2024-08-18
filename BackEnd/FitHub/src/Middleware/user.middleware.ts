import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.params;
    console.log(req);

    const userId = req.params.id;

    if (user && (user.role === 'admin' || user.id === userId)) {
      next();
    } else {
      throw new Error('No tienes acceso a esta ruta');
    }
  }
}
