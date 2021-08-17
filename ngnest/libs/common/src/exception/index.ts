import {
    Injectable,
    Global,
    Module,
    HttpException,
    NotFoundException,
    InternalServerErrorException,
    NotAcceptableException,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

@Injectable()
export class ExceptionService {
    private throw(Exception: ClassConstructor<HttpException>, msg?: string) {
        throw new Exception(msg);
    }

    notFound(msg?: string) {
        this.throw(NotFoundException, msg);
    }

    notAcceptable(msg?: string) {
        this.throw(NotAcceptableException, msg);
    }

    unautorized(msg?: string) {
        this.throw(UnauthorizedException, msg);
    }

    forbidden(msg?: string) {
        this.throw(ForbiddenException, msg);
    }

    internal(msg?: string) {
        this.throw(InternalServerErrorException, msg);
    }
}

/**
 * Global module that provides exception service to throw exceptions
 */
@Global()
@Module({})
export class ExceptionPoolModule {
    static configure() {
        return {
            module: ExceptionPoolModule,
            providers: [ExceptionService],
            export: [ExceptionService],
        };
    }
}
