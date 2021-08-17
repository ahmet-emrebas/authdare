import { IM } from '../util';
import { PH } from './placeholders.enum';

/**
 * Messages used across the application
 */
export const Msg = IM({
    DB: IM({
        DB_STRATEGY_NOT_DEFINED: `Database connection strategy is not defined for ${PH.CLIENT_ORGNNAME}`,
        DB_NAME_IS_UNDEFINED: `Database of ${PH.CLASS_NAME} options does not have the name property`,
    }),

    SIGN_UP: IM({
        ORGNAME_IS_TOKEN: `Account already exists ${PH.RES_BODY_INVALID_FIELD}`,
    }),

    LOGIN: IM({}),
});
