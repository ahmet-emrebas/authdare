import { ResourceService } from '@authdare/common/class';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignupEntity } from './signup.entity';

@Injectable()
export class SignupService extends ResourceService<SignupEntity> {
    constructor(@Inject(SignupEntity) repo: Repository<SignupEntity>) {
        super(repo);
    }
}
