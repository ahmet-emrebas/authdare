import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MailEntity } from './mail.entity';

@Injectable()
export class MailService extends ResourceService<MailEntity> {
    constructor(@Inject(MailEntity) repo: Repository<MailEntity>) {
        super(repo);
    }
}
