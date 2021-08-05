import { NotContains } from 'class-validator';
import { InternalServerErrorException } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Permission, RoleDTO } from './role-permission.dto';

/**
 * Check the role name is not in the black list
 * @returns 
 */
export function IsRoleNameValid() {
    return NotContains('super')
}

enum AdminNames {
    CLIENT = 'client_admin',
    SUPER = 'super_admin'
}

enum AdminMethods {
    ALL = 'ALL'
}

enum AdminResoures {
    CLIENT_RESOURCE = 'CLIENT_RESOURCE',
    SUPER_RESOURCE = 'SUPER_RESOURCE'
}

export class RolesManager {

    private constructor() { }

    static superAdmin() {
        return new RoleDTO({
            name: AdminNames.SUPER,
            permissions: [new Permission({ method: AdminMethods.ALL, resource: AdminResoures.SUPER_RESOURCE })]
        });
    }

    static clientAdmin() {
        return new RoleDTO({
            name: AdminNames.CLIENT,
            permissions: [new Permission({ method: AdminMethods.ALL, resource: AdminResoures.CLIENT_RESOURCE })]
        })
    }

    private static toClassRoles(plainRoles: RoleDTO[]) {
        return plainRoles.map(e => classToClass(new RoleDTO(e)));
    }

    static hasRoles(requiredRoles: RoleDTO[], plainRoles: RoleDTO[]) {

        if (!requiredRoles) return true;

        const roles = this.toClassRoles(plainRoles);
        for (const r of requiredRoles) {
            return !!roles.find(e => e.isEqual(r));
        }
        return false;
    }

    static hasPermissions(requiredPermissions: Permission[], plainRoles: RoleDTO[]) {

        if (!requiredPermissions) return true;

        const roles = this.toClassRoles(plainRoles);
        for (let p of requiredPermissions) {
            for (let r of roles) {
                if (r.hasIn('permissions', p)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Create permission instance 
     * @param permission 
     * @returns 
     */
    static permission(permission: Permission) {
        const item = classToClass(permission)
        const errors = validateSync(item);
        if (errors && errors.length > 0) {
            console.error(errors, RolesManager.name);
            throw new InternalServerErrorException(errors);
        }
        return item;
    }

    /**
     * Create role instance 
     * @param role 
     * @returns 
     */
    static role(role: RoleDTO) {
        const item = classToClass(role)
        const errors = validateSync(item);
        if (errors && errors.length > 0) {
            console.error(errors, RolesManager.name);
            throw new InternalServerErrorException(errors);
        }
        return item;
    }

}
