import { LogService } from '@authdare/log';
import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService extends ResourceService<EventEntity> {
    constructor(
        @Inject(EventEntity) repo: Repository<EventEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}
