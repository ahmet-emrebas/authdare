import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ConnectionTokens } from './connection-tokens';

/**
 * Get repositories and provide them in the module scope by className.
 * @param connectionToken
 * @param entities
 * @returns
 */
export function provideRepositories(
    connectionToken: ConnectionTokens,
    entities: ClassConstructor<any>[],
): Provider<any>[] {
    return entities.map((entity) => {
        return {
            provide: entity,
            inject: [connectionToken],
            useFactory: (con: Connection) => {
                return con.getRepository(entity);
            },
        };
    });
}
