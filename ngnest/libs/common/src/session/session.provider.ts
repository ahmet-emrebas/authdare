import { Request, Session, SessionDatabase, UserDetails } from './../interface';
import { REQUEST } from '@nestjs/core';
import { Provider } from '@nestjs/common';

/**
 * Session Token
 */
export const SESSION = `sdofasoudifuasoidufaiuosdf`;

export function ProvideSession(
    key?: keyof Session,
): Provider<Promise<Session | UserDetails | SessionDatabase | string | string[]>> {
    return {
        provide: SESSION,
        inject: [REQUEST],
        useFactory: async (req: Request) => {
            if (key) {
                return req.userSession[key];
            }
            return req.userSession;
        },
    };
}
