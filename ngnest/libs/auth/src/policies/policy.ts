import { isEqual } from 'lodash';
import { PolicyKey } from './policy.key';
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IPermission, IRole } from '.';

type TSession<T = any> = { [key: string]: T };

type TPolicy = IRole[] | IPermission[] | true | false | string;

export class Policy<T = TPolicy> {
    /**
     *
     * @param key string
     * @param policy type TPolicy = IRole[] | IPermission[] | true | false | string
     */
    constructor (private readonly key: string, private readonly policy: T) { }

    /**
     * Decorate the resource controller method with this method
     * @returns decorator CustomDecorator<string>
     */
    apply(): CustomDecorator<string> {
        return SetMetadata(this.key, this.policy);
    }

    /**
     * Check the policies are equal or not.
     * @param session key value object
     */
    verify(session: TSession): Promise<boolean> | boolean {
        let __policy;
        try {
            __policy = session[PolicyKey.SESSION_KEY][this.key];
        } catch (err) {
            return false;
        }

        return isEqual(__policy, this.policy);
    }
}
