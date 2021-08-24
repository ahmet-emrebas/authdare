import { Request as ExpressRequest } from 'express';
import { Session } from './session';

/**
 * Extended express-request
 */
export interface Request extends ExpressRequest {
    userSession: Session;
}
