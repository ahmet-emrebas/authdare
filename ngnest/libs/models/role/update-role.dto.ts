import { CreatePermissionDto, CreateRoleDto } from './create-role.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    constructor(values?: UpdateRoleDto) {
        super();
        Object.assign(this, values);
    }
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    constructor(values?: UpdatePermissionDto) {
        super();
        Object.assign(this, values);
    }
}