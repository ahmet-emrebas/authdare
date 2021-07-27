import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const http = context.switchToHttp()
    const req = http.getRequest<Request>()
    const res = http.getResponse<Response>()

    console.table({
      resource: req.params.resource,
      method: req.method,
    })
    return { message: "Hello from itnerceptor!" }
  }
}
