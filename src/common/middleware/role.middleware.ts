import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/employees/pdf')) {
    return next();
  }

  const userRole = req.headers['role'];

  if (!userRole) {
    throw new ForbiddenException('Role not provided');
  }

  if (
    userRole !== 'ADMIN' &&
    userRole !== 'HR' &&
    userRole !== 'EMPLOYEE'
  ) {
    throw new ForbiddenException('Invalid role');
  }

  next();
}

}
