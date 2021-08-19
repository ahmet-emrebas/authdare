import {
    NotFoundException,
    Catch,
    HttpException,
    ExceptionFilter,
    ArgumentsHost,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.redirect('/');
    }
}
