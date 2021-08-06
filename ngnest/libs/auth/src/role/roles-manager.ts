import { IPermission, IRole } from '@authdare/interfaces';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { Permission, Role } from '.';


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
    private static logger = new Logger(RolesManager.name);
    private constructor() { }

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

    static hasPermissions(requiredPermissions: Permission[], roles: Role[]) {
        if (!requiredPermissions || requiredPermissions.length == 0) return true;

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
    static async permission(permission: IPermission) {
        const { errors, validatedInstance } = await new Permission(permission).transformAndValidate()
        if (errors && errors.length > 0) {
            this.logger.error(errors, RolesManager.name);
            throw new InternalServerErrorException(errors);
        }
        return validatedInstance;
    }

    /**
     * Create role instance 
     * @param role 
     * @returns 
     */
    static async role(role: IRole): Promise<Role> {
        const { errors, validatedInstance } = await new Role(role).transformAndValidate();
        if (errors) {
            this.logger.error(errors, RolesManager.name);
            throw new InternalServerErrorException(errors);
        }
        return validatedInstance;
    }

}
