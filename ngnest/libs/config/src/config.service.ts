import { LogService } from '@authdare/log';
import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Injectable()
export class ConfigService extends ResourceService<ConfigEntity> {
    constructor(
        @Inject(ConfigEntity) repo: Repository<ConfigEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}
