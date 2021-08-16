import { Provider } from '@nestjs/common';

export enum LoggerOptions {
    /**
     * Logger name provider key
     * @type string
     */
    NAME = '7cb7fef1-b9db-4db5-845c-71931dbd87c0',
}

export function SetLoggerName(name: string): Provider<string> {
    return {
        provide: LoggerOptions.NAME,
        useValue: name,
    };
}
