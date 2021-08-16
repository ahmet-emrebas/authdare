import { SessionData } from 'express-session';
import { Request as ExpressRequest } from 'express';
import { IUserSession } from './user-session';

export interface Request extends ExpressRequest {
    userSession: IUserSession;
}
