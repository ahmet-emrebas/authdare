import { ResourceService } from '@authdare/common/class';
import { LogService } from '@authdare/log';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignupEntity } from './signup.entity';

@Injectable()
export class SignupService extends ResourceService<SignupEntity> {
    constructor(@Inject(SignupEntity) repo: Repository<SignupEntity>, logService: LogService) {
        super(repo, logService);
    }
}
