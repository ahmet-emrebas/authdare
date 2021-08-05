import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Connection, getConnection, createConnection } from "typeorm";
import { AuthUserEntity, CreateAuthUserDTO } from "./sub";

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


    CREATE_MEMBER = 'auth.create_member'

}

@Injectable()
export class AuthEventsService {
    private readonly logger = new Logger(AuthEventsService.name);

    private async createClientDatabase(orgname: string): Promise<Connection> {
        let con: Connection
        try {
            con = getConnection(orgname);
        } catch (err) {
            con = await createConnection({
                name: orgname,
                type: 'sqlite',
                database: `database/${orgname}/main.sqlite`,
                entities: [AuthUserEntity],
                synchronize: true,
                dropSchema: true,
            })
        }
        return con;
    }

    private async getClientConnection(orgname: string): Promise<Connection> {
        let con: Connection

        try {
            con = getConnection(orgname);
        } catch (err) {
            con = await createConnection({
                name: orgname,
                type: 'sqlite',
                database: `database/${orgname}/main.sqlite`,
                entities: [AuthUserEntity]
            })
        }
        return con;
    }

    private async clientUserRepository(con: Connection) {
        return await con.getRepository(AuthUserEntity);
    }

    async createClient__ADMIN(userData: CreateAuthUserDTO) {
        let con = await this.createClientDatabase(userData.orgname);
        const userRepo = await this.clientUserRepository(con);
        return await userRepo.save(userData)
    }

    async createClient__TeamMember(userData: CreateAuthUserDTO) {
        let con = await this.getClientConnection(userData.orgname);
        const userRepo = await this.clientUserRepository(con);
        return await userRepo.save(userData);
    }

    @OnEvent(AuthEvents.SIGNUP)
    async onSignup(payload: CreateAuthUserDTO) {
        const savedUser = await this.createClient__ADMIN(payload);
        this.logger.log('Saved User to client db: ', savedUser);
    }


    @OnEvent(AuthEvents.CREATE_MEMBER)
    async onCreateMember(payload: CreateAuthUserDTO) {
        const saved = await this.createClient__TeamMember(payload);
        this.logger.log('Saved new member to client db: ', saved);

    }

}