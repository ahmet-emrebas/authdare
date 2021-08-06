import { IRole, PolicyKey, IPermission } from '.';
import { Policy } from './policy';
import { assert } from 'chai';

describe('policy', () => {
    const session: any = {
        [PolicyKey.SESSION_KEY]: {},
    };

    /**
     * User sessions
     */

    /**
     * Enforced policies
     */
    const adminRolePolicy = new Policy<IRole[]>(PolicyKey.ROLE, [
        { name: 'admin', permissions: [{ read: true, resource: 'users' }] },
    ]);
    const readUserPolicy = new Policy<IPermission>(PolicyKey.PERMISSION, {
        read: true,
        resource: 'users',
    });
    const memberPolicy = new Policy<boolean>(PolicyKey.MEMBER, true);
    const publicPolicy = new Policy<boolean>(PolicyKey.PUBLIC, true);
    const dynamicPolicy = new Policy<boolean>(PolicyKey.DYNAMIC, true);

    const adminSession: any = {};
    adminSession[PolicyKey.ROLE] = adminRolePolicy;

    test.each`
        UserSession | EnforcedPolicy     | Verification
        ${null}     | ${adminRolePolicy} | ${false}
    `('should do someting', () => {
        assert.equal(1, 1);
    });
});
