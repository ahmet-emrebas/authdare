import { ResourceService } from '@authdare/common/base';
import { LogService } from '@authdare/log';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignupEntity } from './signup.entity';

@Injectable()
export class SignupService extends ResourceService<SignupEntity> {
    constructor(
        @Inject(SignupEntity) repo: Repository<SignupEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}
