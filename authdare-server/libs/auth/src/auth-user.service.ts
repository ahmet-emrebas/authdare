import { LoginDTO } from './dto/login.dto';

import { BaseResourceService } from '@authdare/base';
import { CreateUserDTO, ROLE, UpdateUserDTO, UserEntity } from '@authdare/models';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep, toPlainObject } from 'lodash';
import { Repository } from 'typeorm';
import { SignupDTO } from './dto';
import { compare } from 'bcrypt';
import { getDBConnection } from '@authdare/base/get-db-connection';


@Injectable()
export class AuthUserService extends BaseResourceService<UserEntity, CreateUserDTO, UpdateUserDTO> {

    constructor(
        private readonly jwt: JwtService,
        @InjectRepository(UserEntity) protected readonly orgRepo: Repository<UserEntity>,
        @InjectRepository(UserEntity) protected readonly userRepo: Repository<UserEntity>
    ) {

        super(userRepo, CreateUserDTO, UpdateUserDTO)
    }


    async signup(signupDTO: SignupDTO): Promise<string> | never {
        await this.validate(SignupDTO, signupDTO);

        const user = {
            email: signupDTO.email,
            password: signupDTO.password,
            role: ROLE.ADMIN,
            org: { name: signupDTO.orgname }
        }

        const createdUser = await this.create(toPlainObject(user))

        const __ = await getDBConnection(signupDTO.orgname, true, true);

        const tokenPayload = toPlainObject(createdUser);

        return this.jwt.sign(tokenPayload);

    }


    async login({ email, password }: LoginDTO): Promise<string> | never {
        await this.validate(LoginDTO, { email, password });

        const foundUser = await this.findOne({ where: { email } })

        if (!foundUser?.password)
            throw new NotFoundException("Acount not found!")

        const isPasswordMatch =
            await compare(password, foundUser.password);

        if (!isPasswordMatch)
            throw new UnauthorizedException('Wrong Password!');

        const tokenPayload = toPlainObject(foundUser);

        return this.jwt.sign(tokenPayload);
    }


}
