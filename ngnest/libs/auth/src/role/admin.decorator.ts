import { RolesPolicy } from '@authdare/decorators/auth';
import { RolesManager } from './roles-manager';

export function ClientAdmin() {
    return RolesPolicy([RolesManager.clientAdmin()])
}


export function SuperAdmin() {
    return RolesPolicy([RolesManager.superAdmin()]);
}
