import { classToClass } from 'class-transformer';
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
    static hasRole(requiredRole: Role, plainRoles: Role[]) {
        const roles = this.toClassRoles(plainRoles);
        return !!roles.find(e => e.isEqual(requiredRole));
    }

    static hasPermission(requiredPermission: Permission, plainRoles: Role[]) {
        const roles = this.toClassRoles(plainRoles);
        for (let r of roles) {
            if (r.hasIn('permissions', requiredPermission)) {
                return true;
            }
        }
        return false;
    }
}
