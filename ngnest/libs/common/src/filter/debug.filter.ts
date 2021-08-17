import { HttpException } from '@nestjs/common/exceptions';
import { Catch, ExceptionFilter, Injectable, ArgumentsHost, Logger } from '@nestjs/common';
import { response, Response } from 'express';
import { Request } from '../interface';

@Injectable({})
@Catch(HttpException, Error)
export class DebugExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(DebugExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = exception?.getStatus();
            const result = {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            };

            this.logger.error(
                ` [DebugExceptionFilter] <${result.statusCode}> ${exception.message}`,
            );

            response.status(status).json(result);
        } catch (err) {
            console.error(err);
            response.end();
        }
    }
}
