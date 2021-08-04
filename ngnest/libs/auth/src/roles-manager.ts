import { classToClass } from 'class-transformer';
import { validate, validateOrReject } from 'class-validator';
import { Permission, Role } from "./sub"

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
    static superAdmin() {
        return new Role({
            name: AdminNames.SUPER,
            permissions: [new Permission({ method: AdminMethods.ALL, resource: AdminResoures.SUPER_RESOURCE })]
        });
    }

    static clientAdmin() {
        return new Role({
            name: AdminNames.CLIENT,
            permissions: [new Permission({ method: AdminMethods.ALL, resource: AdminResoures.CLIENT_RESOURCE })]
        })
    }

    private static toClassRoles(plainRoles: Role[]) {
        return plainRoles.map(e => classToClass(new Role(e)));
    }
    static hasRoles(requiredRoles: Role[], plainRoles: Role[]) {

        if (!requiredRoles) return true;

        const roles = this.toClassRoles(plainRoles);
        for (const r of requiredRoles) {
            return !!roles.find(e => e.isEqual(r));
        }
        return false;
    }

    static hasPermissions(requiredPermissions: Permission[], plainRoles: Role[]) {

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
    static async permission(permission: Permission) {
        const item = classToClass(permission)
        await validateOrReject(item);
        return item;
    }

    /**
     * Create role instance 
     * @param role 
     * @returns 
     */
    static async role(role: Role) {
        const item = classToClass(role)
        await validateOrReject(item);
        return item;
    }

}
