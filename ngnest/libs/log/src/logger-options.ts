import { IM } from '@authdare/common/util';
import { Provider } from '@nestjs/common';

export enum LoggerOptions {
    /**
     * Logger name provider key
     * @type string
     */
    NAME = '7cb7fef1-b9db-4db5-845c-71931dbd87c0',

    /**
     * Logger status
     * @type boolean
     */
    STATUS = '257331b0-2ea3-4cad-b75e-e1d798551b8d',

    /**
     * Is logs saved to database?
     * @type boolean
     */
    PERSIST = '73c46a54-3c3f-419b-be0b-0f4e755840ee',
}

export const LoggerOff: Provider = IM({
    provide: LoggerOptions.STATUS,
    useValue: false,
});

export const LoggerOn: Provider = IM({
    provide: LoggerOptions.STATUS,
    useValue: false,
});
