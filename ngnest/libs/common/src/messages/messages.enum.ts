import { IM } from '../util';
import { PH } from './placeholders.enum';

/**
 * Messages used across the application
 */
export const Msg = IM({
    DB: IM({
        DB_STRATEGY_NOT_DEFINED: `Database connection strategy is not defined for ${PH.CLIENT_ORG}`,
    }),

    SIGN_UP: IM({
        ORGNAME_IS_TOKEN: `Account already exists ${PH.BODY_ORGNAME}`,
    }),

    LOGIN: IM({}),
});
