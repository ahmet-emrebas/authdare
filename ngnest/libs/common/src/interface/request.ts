import { Request as ExpressRequest } from 'express';
import { Session } from './session';

export interface Request extends ExpressRequest {
    userSession: Session;
}
