import { IPermission } from './i-permission';
import { IRole, PolicyKey } from ".";
import { Policy } from "./policy";
import { assert } from 'chai';

describe('Policy', () => {
    const adminRole: IRole = { name: 'admin', permissions: [{ read: true, resource: 'users' }] }
    const adminRolePolicy = new Policy(PolicyKey.ROLE, [adminRole])
    const session: any = {}
    session[PolicyKey.SESSION_KEY] = {}


    test.each`
        UserSession | EnforcedPolicy | Verification
        ${1} | ${1} | ${1}

    `('', () => {

    })

    it('should verify true for valid role', () => {
        session[PolicyKey.SESSION_KEY][PolicyKey.ROLE] = [adminRole] as IRole[]
        assert.equal(adminRolePolicy.verify(session), true);
    })


});