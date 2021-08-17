/**
 * Global Place Holder (PH)
 * Used to append client information to error messages/messages/emails etc.
 */
export enum PH {
    CLIENT_ID = '$CLIENT_ID',
    CLIENT_NAME = '$CLIENT_NAME',
    CLIENT_EMAIL = '$CLIENT_EMAIL',
    CLIENT_ORGNNAME = '$CLIENT_ORGNNAME',

    REQ_BODY_ORGNAME = '$REQ_BODY_ORGNAME',
    REQ_BODY_EMAIL = '$REQ_BODY_EMAIL',
    REQ_BODY_PHONE = '$REQ_BODY_PHONE',

    RES_BODY_ORGNAME = '$RES_BODY_ORGNAME',
    RES_BODY_EMAIL = '$RES_BODY_EMAIL',
    RES_BODY_PHONE = '$RES_BODY_PHONE',
    RES_BODY_INVALID_FIELD = '$RES_BODY_INVALID_FIELD',

    CLASS_NAME = `$CLASS_NAME`,
}
