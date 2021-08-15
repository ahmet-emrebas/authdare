import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from './log.entity';

@Injectable()
export class LogService extends ResourceService<LogEntity> {
    constructor(@Inject(LogEntity) repo: Repository<LogEntity>) {
        super(repo);
    }

    async error(message: string) {
        return await this.save({ code: 5000, message });
    }

    async info(message: string) {
        return await this.save({ code: 2000, message });
    }

    async warn(message: string) {
        return await this.save({ code: 4000, message });
    }
}
