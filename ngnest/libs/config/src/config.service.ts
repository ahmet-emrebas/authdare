import { ResourceService } from '@authdare/common/class';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from 'apps/api/src/config/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigService extends ResourceService<ConfigEntity> {
    constructor(@InjectRepository(ConfigEntity) __repo: Repository<ConfigEntity>) {
        super(__repo);
    }
}
