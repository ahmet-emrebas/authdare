import { SetMetadata } from '@nestjs/common';
import * as joi from 'joi';

export const ResourcePolicyToken = 'ResourcePolicyToken';

export interface IResourcePolicyOptions {
    permission?: string;
    public?: boolean;
}

const resourceNameExp = ` *[a-zA-Z]{3,20}`;
const methodExp = ` *(GET|POST|PUT|DELETE|UPDATE){1}`;
const resourcePermissionString = methodExp + resourceNameExp;

const ResourcePolicyValidator = joi.object<IResourcePolicyOptions>({
    permission: joi.string().pattern(new RegExp(resourcePermissionString, 'im')),
    public: joi.boolean(),
});

/**
 * Set meta data for the handler
 * @param options
 * @returns
 */
export function ResourcePolicy(options: IResourcePolicyOptions) {
    const errors = ResourcePolicyValidator.validate(options);
    if (errors.error) {
        throw new Error(errors.error.message);
    }
    return SetMetadata(ResourcePolicyToken, options);
}
