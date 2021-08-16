import { REQUEST } from '@nestjs/core';
import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from './log.entity';
import { Request } from 'express';

@Injectable({
    scope: Scope.REQUEST,
})
export class LogService extends ResourceService<LogEntity> {
    private loggerName!: string;

    constructor(@Inject(LogEntity) repo: Repository<LogEntity>, @Inject(REQUEST) req: Request) {
        super(repo);
        this.loggerName = `${req.method.toUpperCase()} ${req.url}`;
    }

    async error(message: string) {
        try {
            await this.save({ resource: this.loggerName, code: 5000, message: message });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    async info(message: string) {
        try {
            await this.save({ resource: this.loggerName, code: 2000, message });
        } catch (err) {
            console.error(err);
            return;
        }
    }

    async warn(message: string) {
        try {
            await this.save({ resource: this.loggerName, code: 4000, message });
        } catch (err) {
            console.error(err);
            return;
        }
    }
}
