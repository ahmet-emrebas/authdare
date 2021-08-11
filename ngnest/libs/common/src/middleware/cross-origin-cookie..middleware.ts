import { NextFunction, Request, Response } from 'express';

export default function (domains: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        req.headers['access-control-allow-credentials'] = domains.join(',');
        req.headers['access-control-allow-headers'] = '*';
        next();
    };
}
