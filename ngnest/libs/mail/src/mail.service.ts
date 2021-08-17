import { ResourceService } from '@authdare/common/base';
import { LogService } from '@authdare/log';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MailEntity, MailTemplatesEntity } from './mail.entity';

@Injectable()
export class MailService extends ResourceService<MailEntity> {
    constructor(
        @Inject(MailEntity) repo: Repository<MailEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}

@Injectable()
export class MailTemplateService extends ResourceService<MailTemplatesEntity> {
    constructor(
        @Inject(MailTemplatesEntity) repo: Repository<MailTemplatesEntity>,
        logService: LogService,
    ) {
        super(repo, logService);
    }
}
