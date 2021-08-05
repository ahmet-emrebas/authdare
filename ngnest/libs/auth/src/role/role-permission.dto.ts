import { BaseClass } from "@authdare/objects";
import { InitEach, Trim } from "@authdare/utils";
import { ApiProperty, } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsRoleNameValid } from "./roles-manager";

@Exclude()
export class Permission extends BaseClass<Permission> {

    @ApiProperty({ default: 'get' })
    @Expose()
    @Trim()
    readonly method!: string;

    @Expose()
    @ApiProperty({ default: 'users' })
    @Trim()
    readonly resource!: string;

}


@Exclude()
export class RoleDTO extends BaseClass<RoleDTO> {

    @ApiProperty({ default: 'admin' })
    @IsRoleNameValid()
    @Expose()
    readonly name!: string;

    @ApiProperty({ default: [{ method: 'get', resource: 'users' }] })
    @Expose()
    @InitEach(Permission)
    readonly permissions!: Permission[];
}



