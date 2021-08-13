import { v4 } from 'uuid';
console.log(v4());
console.log(v4());
console.log(v4());
console.log(v4());

export enum DatabaseTokens {
    TEMPLATE_DB = 'TEMPLATE_DB (df5d4bf4-9d72-46ef-9d7b-a74485cd11b0)',
    CLIENT_CONNECTION = 'CLIENT_CONNECTION (e94c18e7-871f-4a99-8ab3-0cf1633774ea)',
    CLIENT_REPOSITORY = 'CLIENT_REPOSITORY (a6b768e2-305b-4ae2-bd2c-2f147e284552)',
}
