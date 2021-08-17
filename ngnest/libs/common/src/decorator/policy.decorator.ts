import { SetMetadata } from '@nestjs/common';
import * as joi from 'joi';

export const RESOURCE_POLICY = 'RESOURCE_POLICY';

export interface IResourcePolicyOptions {
    /**
     * Required permissions for the resource
     */
    permission?: string;

    /**
     * Make the resouce public.
     */
    public?: boolean;

    /**
     * check the user has the required subscription to this service and it did not expired.
     */
    services?: string;
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
    return SetMetadata(RESOURCE_POLICY, options);
}
