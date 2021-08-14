import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogEntity } from './log.entity';

@Injectable()
export class LogService extends ResourceService<LogEntity> {
    constructor(@Inject(LogEntity) repo: Repository<LogEntity>) {
        super(repo);
    }
}
