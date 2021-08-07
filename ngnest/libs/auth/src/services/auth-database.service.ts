import { ClassConstructor } from 'class-transformer';

import { internet } from 'faker';
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, createConnection, Repository } from 'typeorm';
import { UserEntity, CreateUserDTO } from '../user';
import { ProviderTokens } from '../provider-tokens';

export enum AuthEvents {
    /**
     * Any event with "auth." prefix
     * @event auth.*
     */
    ANY = 'auth.*',

    /**
     * When sign up
     * @event auth.signup
     */
    SIGNUP = 'auth.signup',
    SIGNUP_EMAIL = 'auth.signup_email',

    /**
     * When login
     * @event auth.login
     */
    LOGIN = 'auth.login',

    /**
     * When delete an account
     * @event auth.delete
     */
    DELETE = 'auth.delete',

    CREATE_MEMBER = 'auth.create_member',
    CREATE_MEMBER_EMAIL = 'auth.create_member_email',

    FORGOT_PASSWORD = 'auth.forgot_password',
    FORGOT_PASSWORD_EMAIL = 'auth.forgot_password_email',
}

@Injectable()
export class AuthDatabaseService {
    private readonly logger = new Logger(AuthDatabaseService.name);

    constructor(
        @Inject(ProviderTokens.RESOURCE_ENTITIES_TOKEN) private readonly entities: ClassConstructor<any>[],
        private readonly eventEmitter: EventEmitter2,
        @InjectRepository(UserEntity) private readonly authUserEntity: Repository<UserEntity>,
    ) {}

    private async createClientDatabase(orgname: string): Promise<Connection> {
        let con: Connection;
        try {
            con = getConnection(orgname);
        } catch (err) {
            con = await createConnection({
                name: orgname,
                type: 'sqlite',
                database: `database/${orgname}/main.sqlite`,
                entities: this.entities,
                synchronize: true,
                dropSchema: true,
            });
        }
        return con;
    }

    private async getClientConnection(orgname: string): Promise<Connection> {
        let con: Connection;

        try {
            con = getConnection(orgname);
        } catch (err) {
            con = await createConnection({
                name: orgname,
                type: 'sqlite',
                database: `database/${orgname}/main.sqlite`,
                entities: this.entities,
            });
        }
        return con;
    }

    private async clientUserRepository(con: Connection) {
        return await con.getRepository(UserEntity);
    }

    private async createClient__ADMIN(userData: CreateUserDTO) {
        let con = await this.createClientDatabase(userData.orgname);
        const userRepo = await this.clientUserRepository(con);
        return await userRepo.save(userData);
    }

    private async createClient__TeamMember(userData: CreateUserDTO) {
        let con = await this.getClientConnection(userData.orgname);
        const userRepo = await this.clientUserRepository(con);
        return await userRepo.save(userData);
    }

    private async updateClientUserPassword(userData: UserEntity) {
        let con = await this.getClientConnection(userData.orgname);
        const userRepo = await this.clientUserRepository(con);
        await userRepo.update(userData.id, { password: userData.password });
    }

    @OnEvent(AuthEvents.SIGNUP)
    private async onSignup(payload: CreateUserDTO) {
        const savedUser = await this.createClient__ADMIN(payload);
        this.logger.log('Saved User to client db: ', savedUser);
        this.eventEmitter.emit(AuthEvents.SIGNUP_EMAIL, payload);
    }

    @OnEvent(AuthEvents.CREATE_MEMBER)
    private async onCreateMember(payload: CreateUserDTO) {
        const saved = await this.createClient__TeamMember(payload);
        this.logger.log('Saved new member to client db: ', saved);
        this.eventEmitter.emit(AuthEvents.CREATE_MEMBER_EMAIL, payload);
    }

    @OnEvent(AuthEvents.FORGOT_PASSWORD)
    private async onForgotPassword(payload: UserEntity) {
        const newPassword = internet.password();

        const { errors, validatedInstance } = await new CreateUserDTO({ ...payload, password: newPassword }).transformAndValidate();

        if (errors) {
            this.logger.error('Could not validate the user data for some reason!', errors, validatedInstance);
            throw new InternalServerErrorException();
        }

        await this.authUserEntity.update(payload.id, { password: newPassword });
        await this.updateClientUserPassword(new UserEntity({ ...payload, password: validatedInstance.password }));
        await this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD_EMAIL, validatedInstance);
    }
}
