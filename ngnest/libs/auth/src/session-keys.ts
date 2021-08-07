import { ImObject } from '@authdare/utils';
import { v4 as uuid } from 'uuid';

export const SessionKeys = ImObject({
    SESSION_KEY: uuid(),
});
