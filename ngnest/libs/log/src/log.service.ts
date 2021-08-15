import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable, Scope, Optional, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from './log.entity';
import { LoggerOptions } from './logger-options';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LogService extends ResourceService<LogEntity> {
    private loggerName!: string;

    constructor(
        @Inject(LogEntity) repo: Repository<LogEntity>,
        @Optional() @Inject(LoggerOptions.NAME) loggerName?: string,
        @Optional() @Inject(LoggerOptions.STATUS) loggerStatus?: boolean,
    ) {
        super(repo);
        this.loggerName = loggerName || 'LogService ( LOGGER_NAME not provided )';
    }

    async error(message: string) {
        return await this.save({ resource: this.loggerName, code: 5000, message });
    }

    async info(message: string) {
        return await this.save({ resource: this.loggerName, code: 2000, message });
    }

    async warn(message: string) {
        return await this.save({ resource: this.loggerName, code: 4000, message });
    }
}
