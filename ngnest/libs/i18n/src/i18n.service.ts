import { ResourceService } from '@authdare/common/class';
import { LogService } from '@authdare/log';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { I18nKeyEntity, I18nValueEntity } from './i18n.entity';

@Injectable()
export class I18nValueService extends ResourceService<I18nValueEntity> {
    constructor(@Inject(I18nValueEntity) repo: Repository<I18nValueEntity>) {
        super(repo);
    }
}

@Injectable()
export class I18nKeyService extends ResourceService<I18nKeyEntity> {
    constructor(@Inject(I18nKeyEntity) repo: Repository<I18nKeyEntity>, logService: LogService) {
        super(repo, logService);
    }
}
