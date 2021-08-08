import { ImObject } from '@authdare/utils';

export function createPermissions(resource: string) {
    return ImObject({
        GET: `get:${resource}`,
        POST: `post:${resource}`,
        PATCH: `patch:${resource}`,
        DELETE: `delete:${resource}`,
    });
}
