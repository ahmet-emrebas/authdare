import { HttpStatus, NestMiddleware } from '@nestjs/common';

export const OriginWhiteListMiddleware = (whiteList: string[]) =>
    class COWM implements NestMiddleware {
        use(req: any, res: any, next: () => void) {
            console.log(req.headers.origin);

            if (!req.headers?.origin) {
                res.send({ message: 'Not allowed without origin!' });
                return;
            }

            if (whiteList.indexOf(req.headers.origin!) !== -1) {
                next();
            } else {
                res.status(HttpStatus.NOT_ACCEPTABLE);
                res.send({ message: 'Origin is not allowed!' });
            }
        }
    };
