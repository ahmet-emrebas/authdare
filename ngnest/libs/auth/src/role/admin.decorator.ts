import { HasRole } from '@authdare/decorators/auth';
import { RolesManager } from './roles-manager';

export function ClientAdmin() {
    return HasRole([RolesManager.clientAdmin()])
}


export function SuperAdmin() {
    return HasRole([RolesManager.superAdmin()]);
}
