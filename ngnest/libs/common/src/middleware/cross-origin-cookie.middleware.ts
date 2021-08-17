import { NextFunction, Request, Response } from 'express';

/**
 * Middleware that allows the the origins.
 * @param domains
 * @returns
 */
export function crossOriginCookieMiddleware(domains: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.headers['access-control-allow-credentials'] = domains.join(',');
        req.headers['access-control-allow-headers'] = '*';
        next();
    };
}
