import { RolesManager } from './roles-manager';
import { HasRole } from "./roles-meta-data.decorator";

export function ClientAdmin() {
    return HasRole([RolesManager.clientAdmin()])
}


export function SuperAdmin() {
    return HasRole([RolesManager.superAdmin()]);
}
