import { ResourceService } from '@authdare/common/base';
import { LogService } from '@authdare/log';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PublicUserEntity } from './public-user.entity';
import { SignupDetailsEntity } from './signup-details.entity';
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
@Injectable()
export class SignupDetailsService extends ResourceService<SignupDetailsEntity> {
    constructor(
        @Inject(SignupDetailsEntity) repo: Repository<SignupDetailsEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}

@Injectable()
export class PublicUserService extends ResourceService<PublicUserEntity> {
    constructor(
        @Inject(PublicUserEntity) repo: Repository<PublicUserEntity>,
        @Optional() logService: LogService,
    ) {
        super(repo, logService);
    }
}
