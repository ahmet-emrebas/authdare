import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateSubDTO, SubEntity } from "./sub";

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

    @OnEvent(AuthEvents.SIGNUP)
    onSignup(payload: SubEntity) {
        this.logger.debug("Sign up event");
    }
}