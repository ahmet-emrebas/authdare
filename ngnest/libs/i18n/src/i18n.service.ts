import { ResourceService } from '@authdare/common/class';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nValueEntity } from './i18n.entity';

@Injectable()
export class I18nService extends ResourceService<I18nValueEntity> {
    constructor(@InjectRepository(I18nValueEntity) repo: Repository<I18nValueEntity>) {
        super(repo);
    }
}
