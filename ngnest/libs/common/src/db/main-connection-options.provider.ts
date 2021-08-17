import { Provider } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';

export const MAIN_CONNECTION_OPTIONS = '74c1d955-01b0-4db3-ac86-72a625e45439';

/**
 * Proviced connection options with the key MAIN_CONNECTION_OPTIONS.
 * @param options ConnectionOptions
 * @returns
 */
export function mainConnectionOptionsProvider(
    options: ConnectionOptions,
): Provider<ConnectionOptions> {
    return {
        provide: MAIN_CONNECTION_OPTIONS,
        useValue: options,
    };
}
