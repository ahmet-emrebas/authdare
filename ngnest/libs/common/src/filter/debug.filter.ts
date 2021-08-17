import { HttpException } from '@nestjs/common/exceptions';
import { Catch, ExceptionFilter, Injectable, ArgumentsHost, Logger, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.REQUEST,
})
@Catch(HttpException, Error)
export class DebugExceptionFilter implements ExceptionFilter {
    private logger!: Logger;
    private handlerName!: string;
    private className!: string;

    constructor() {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToRpc().getContext();
        this.handlerName = context.getHandler().name;
        this.className = context.getClass().name;
        this.logger = new Logger(this.handlerName + '.' + this.className + '()');
        this.logger.error(`<${exception.getStatus()}> ${exception.message}`);
        throw exception;
    }
}
