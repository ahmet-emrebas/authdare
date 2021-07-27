import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
/**
 * Only responsible for setting request variables like user and organization
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() { }
  async use(req: Request, res: Response, next: () => void) {
    next();
  }
}
