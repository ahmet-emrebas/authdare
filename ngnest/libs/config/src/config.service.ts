import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigEntity } from './config.entity';

@Injectable()
export class ConfigService extends ResourceService<ConfigEntity> {
    constructor(@Inject(ConfigEntity) repo: Repository<ConfigEntity>) {
        super(repo);
    }
}
