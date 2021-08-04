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
    DELETE = 'auth.delete'

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

    async createClientAdminUser(con: Connection, userData: CreateAuthUserDTO) {
        const userRepo = await con.getRepository(AuthUserEntity);
        return await userRepo.save(userData)
    }

    @OnEvent(AuthEvents.SIGNUP)
    async onSignup(payload: AuthUserEntity) {
        const con = await this.createClientDatabase(payload.orgname)
        const savedUser = await this.createClientAdminUser(con, payload);
        this.logger.log('Saved User to client db: ', savedUser);
    }


}