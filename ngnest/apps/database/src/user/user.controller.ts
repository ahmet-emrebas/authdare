import { DPT } from './../database-provider.tokens';
import { Controller, Get, Inject, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '.';
import { t } from '@authdare/common/type';

@Controller({
    scope: Scope.REQUEST,
    path: 'users',
})
export class UserController {
    private readonly repo = t<Repository<UserEntity>>();
    constructor(@Inject(DPT.CLIENT_CONNECTION) con: Connection) {
        this.repo = con.getRepository(UserEntity);
    }

    @Get()
    get() {
        return this.repo.find();
    }
}
